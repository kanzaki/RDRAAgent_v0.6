#!/usr/bin/env node

const readline = require('readline');
const { exec, spawn } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/**
 * プラットフォームに応じたLLMターミナル起動コマンドを生成する
 * @returns {string|null} ターミナルコマンド文字列、またはサポートされていない場合null
 */
function getLLMTerminalCommand(runPprompt) {
    const platform = process.platform;
    if (platform === 'win32') {
        // Windowsの場合：専用バッチファイルを呼び出す
        const prompt = 'start cmd /k "RDRA_Knowledge\\helper_tools\\command\\commandRun.bat claude "' + "\"" +runPprompt + "\"";
        console.log(prompt);
        return prompt;
    } else if (platform === 'darwin') {
        // macOSの場合：専用シェルスクリプトを呼び出す
        const scriptPath = 'RDRA_Knowledge/helper_tools/command/commandRun.sh';
        const currentDir = process.cwd();
        const prompt = `osascript -e 'tell application "Terminal" to do script "cd \\"${currentDir}\\" && bash ${scriptPath} claude \\"${runPprompt}\\""'`;
        console.log(prompt);
        return prompt;
    } else {
        return null;
    }
}
/**
 * プラットフォームに応じたクリップボードコマンドを生成する
 * @param {string} filePath - コピーするファイルのパス
 * @returns {string|null} クリップボードコマンド文字列、またはサポートされていない場合null
 */
function getClipboardCommand(filePath) {
    const platform = process.platform;
    if (platform === 'win32') {
        // Windowsの場合：PowerShellを使用
        const windowsPath = filePath.replace(/\//g, '\\');
        return `powershell -Command "Get-Content -Path ${windowsPath} -Encoding UTF8 | Set-Clipboard"`;
    } else if (platform === 'darwin') {
        // macOSの場合：pbcopyを使用
        return `cat "${filePath}" | pbcopy`;
    } else {
        return null;
    }
}
/**
 * プラットフォームに応じたブラウザ起動コマンドを生成する
 * @param {string} url - 開くURL
 * @returns {string|null} ブラウザ起動コマンド文字列、またはサポートされていない場合null
 */
function getBrowserCommand(url) {
    const platform = process.platform;
    if (platform === 'win32') {
        // Windowsの場合：startコマンドを使用
        return `powershell -Command "Start-Process ${url}"`;
    } else if (platform === 'darwin') {
        // macOSの場合：openコマンドを使用
        return `open "${url}"`;
    } else {
        return null;
    }
}
/**
 * RDRAZeroOne　Phase1~Phase4 RDRA RDRASpecのファイル
 */
const phase1Files = [
    'アクター.tsv',
    '外部システム.tsv',
    'ビジネスポリシー.tsv',
    '業務.tsv',
    '情報.tsv',
    '状態.tsv'
];
const phase2Files = [
    '業務.tsv',
    '条件.tsv',
    'バリエーション.tsv',
    '情報.tsv',
    '状態.tsv'
];
const phase3Files = [
    'アクター.tsv',
    '外部システム.tsv',
    '条件.tsv',
    'バリエーション.tsv',
    '情報.tsv',
    '状態.tsv',
    'BUC.tsv',
];
const phase4Files = [
    'BUC.tsv',
    '条件.tsv',
    '情報.tsv',
    '状態.tsv'
];
const rdraFiles = [
    'システム概要.json',
    'BUC.tsv',
    'アクター.tsv',
    '外部システム.tsv',
    '情報.tsv',
    '状態.tsv',
    '条件.tsv',
    'バリエーション.tsv'
];
const specFiles = [
    'business_rule.md',
    'ui.json',
    '論理データ.tsv',
    '論理データモデル.md'
];
/**
 * 指定した配列のファイル名が全て指定フォルダー内に存在するか確認する
 * @param {string[]} fileNames - チェックするファイル名の配列
 * @param {string} folderPath - 検査するフォルダーのパス
 * @returns {boolean} - 全て存在すればtrue、1つでもなければfalse
 */
function checkAllFilesExistInFolder(fileNames, folderPath) {
    const fs = require('fs');
    try {
        const filesInDir = fs.readdirSync(folderPath);
        return fileNames.every(file => filesInDir.includes(file));
    } catch (err) {
        console.error(`ディレクトリの読み込みエラー: ${err}`);
        return false;
    }
}
function waitForEnterThenNext() {
    console.log('続行するにはEnterキーを押してください...');
    process.stdin.once('data', () => {
        promptUser();
    });
}
/**
 * メニューを表示する
 */
function showMenu() {
    console.log('■ZeroOne');
    console.log('1.フェーズ単位の要件定義：RDRA定義をフェーズ毎に実行する');
    console.log('2.一括要件定義：RDRA定義を一括実行する');
    console.log('■RDRA');
    console.log('11.RDRAGraphを表示：関連データを作成しRDRAGraphを表示');
    console.log('12.Spreadsheetに展開：RDRA定義をクリップボードにコピー');
    console.log('13.RDRA定義の説明を作成：RDRA定義の説明を作成する');
    console.log('14.RDRA定義の妥当性を検証：妥当性検証環境.csvからRDRA定義を検証する');
    console.log('■RDRASpec：仕様');
    console.log('21.仕様の作成：論理データ構造/画面/ビジネスルール');
    console.log('22.仕様の妥当性を検証：論理データと画面の妥当性');
    console.log('23.画面編集を表示する');
    console.log('24.アクター別画面を表示する');
    console.log('■全般');
    console.log('0.メニュー終了');
    console.log('');
    console.log('99.生成した成果物の削除：0_RDRAZeroOne/1_RDRA/2_RDRASpec');
    console.log('');
    console.log('実行したい番号を入力してください');
}
/**
 * ユーザーの選択に応じて処理を実行する
 * @param {string} option - 選択された番号
 */
function executeOption(option) {
    switch (option) {
        case '1':
            executeEachPhase();
            break;
        case '2':
            executeAllPhase();
            break;
        case '11':
            if(checkAllFilesExistInFolder(rdraFiles, '1_RDRA')) {
                console.log('RDRAGraphを表示する。');
                showRDRAGraph();
            } else {
                console.log('1_RDRAフォルダーにRDRA定義が生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '12':
            if(checkAllFilesExistInFolder(rdraFiles, '1_RDRA')) {
                console.log('ZeroOneデータをクリップボードにコピーします...');
                makeZeroOneData();
                waitForEnterThenNext();
            } else {
                console.log('1_RDRAフォルダーにRDRA定義が生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '13':
            if(checkAllFilesExistInFolder(rdraFiles, '1_RDRA')) {
                console.log('RDRA定義の説明を作成する。');
                executeLLMTerminal('パス「RDRA_Knowledge/1_RDRA指示.md」のファイルを読んで、Phase1を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、1_RDRAフォルダ内ではありません');
            } else {
                console.log('1_RDRAフォルダーにRDRA定義が生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '14':
            if(checkAllFilesExistInFolder(rdraFiles, '1_RDRA')) {
                console.log('RDRA定義の妥当性を検証する。');
                executeLLMTerminal('パス「RDRA_Knowledge/1_RDRA指示.md」のファイルを読んで、Phase2を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、1_RDRAフォルダ内ではありません');
            } else {
                console.log('1_RDRAフォルダーにRDRA定義が生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '21':
            if(checkAllFilesExistInFolder(rdraFiles, '1_RDRA')) {
                console.log('仕様の作成を行う。');
                executeLLMTerminal('パス「RDRA_Knowledge/2_Spec指示.md」のファイルを読んで、Phase1を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、2_RDRASpecフォルダ内ではありません');
            } else {
                console.log('2_RDRASpecフォルダーに仕様ファイルが生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '22':
            if(checkAllFilesExistInFolder(rdraFiles, '1_RDRA')) {
                console.log('仕様の妥当性を検証する。');
                executeLLMTerminal('パス「RDRA_Knowledge/2_Spec指示.md」のファイルを読んで、Phase2を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、2_RDRASpecフォルダ内ではありません');
            } else {
                console.log('2_RDRASpecフォルダーに仕様ファイルが生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '23':
            if(checkAllFilesExistInFolder(specFiles, '2_RDRASpec')) {
                console.log('画面編集を表示する。');
                startUIServer();
            } else {
                console.log('2_RDRASpecフォルダーに仕様ファイルが生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '24':
            if(checkAllFilesExistInFolder(specFiles, '2_RDRASpec')) {
                console.log('アクター別画面を表示する。');
                showActorUI();
            } else {
                console.log('2_RDRASpecフォルダーに仕様ファイルが生成されていません。');
                waitForEnterThenNext();
            }
            break;
        case '0':
            exitProgram();
            break;
        case '99':
            deleteGeneratedFiles();
            break;
        default:
            console.log('無効な選択肢です。選択肢の番号を入力してください。');
            waitForEnterThenNext();
            break;
    }
}
/**
 * LLMターミナルを起動する
 */
function executeLLMTerminal(prompt) {
    console.log('LLMを実行するためにTerminalを開きます...');
    const terminalCmd = getLLMTerminalCommand(prompt); //'llm_menu.mdファイルの「menu()」を実行する'
    if (!terminalCmd) {
        console.log('このOSでは自動でターミナルを開けません。手動で「LLM」を実行してください。');
        promptUser();
        return;
    }
    exec(terminalCmd, (error) => {
        if (error) {
            console.error('ターミナルの起動に失敗しました:', error);
        } else {
            console.log('新しいターミナルで「LLM」を実行しました。');
        }
    });
    promptUser();
}

/**
 * フェーズ単位のRDRA定義を実行する（定義されていないフェーズがあれば実行する）
 */
function executeEachPhase() {
    console.log('フェーズ単位の要件定義を実行します...');
    const phaseExist1 = checkAllFilesExistInFolder(phase1Files, '0_RDRAZeroOne/phase1');
    if (phaseExist1) {
        console.log('phase1は定義されています。');
    } else {
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase1を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
        return;
    }
    const phaseExist2 = checkAllFilesExistInFolder(phase2Files, '0_RDRAZeroOne/phase2');
    if (phaseExist2) {
        console.log('phase2は定義されています。');
    } else {
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase2を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
        return;
    }
    const phaseExist3 = checkAllFilesExistInFolder(phase3Files, '0_RDRAZeroOne/phase3');
    if (phaseExist3) {
        console.log('phase3は定義されています。');
    } else {
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase3を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
        return;
    }
    const phaseExist4 = checkAllFilesExistInFolder(phase4Files, '0_RDRAZeroOne/phase4');
    if (phaseExist4) {
        console.log('phase4は定義されています。');
    } else {
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase4とPhase5を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
        return;
    }
    const phaseExist5 = checkAllFilesExistInFolder(rdraFiles, '1_RDRA');
    if (phaseExist5) {
        console.log('1_RDRAフォルダーにコピーされています。');
    } else {
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase5を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
        return;
    }
    waitForEnterThenNext();
}
/**
 * 全フェーズのRDRA定義を実行する（定義されていないフェーズがあれば実行する）
 */
function executeAllPhase() {
    console.log('全フェーズのRDRA定義を行います...');
    const phaseExist1 = checkAllFilesExistInFolder(phase1Files, '0_RDRAZeroOne/phase1');
    const phaseExist2 = checkAllFilesExistInFolder(phase2Files, '0_RDRAZeroOne/phase2');
    const phaseExist3 = checkAllFilesExistInFolder(phase3Files, '0_RDRAZeroOne/phase3');
    const phaseExist4 = checkAllFilesExistInFolder(phase4Files, '0_RDRAZeroOne/phase4');
    const phaseExist5 = checkAllFilesExistInFolder(rdraFiles, '1_RDRA');
    
    // 存在しない最初のフェーズから実行
    if (!phaseExist1) {
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase1からPhase5までを実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
    } else if (!phaseExist2) {
        console.log('phase1は定義されています。');
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase2からPhase5までを実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
    } else if (!phaseExist3) {
        console.log('phase1, phase2は定義されています。');
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase3からPhase5までを実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
    } else if (!phaseExist4) {
        console.log('phase1, phase2, phase3は定義されています。');
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase4からPhase5までを実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
    } else if (!phaseExist5) {
        console.log('phase1~phase4は定義されています。');
        executeLLMTerminal('パス「RDRA_Knowledge/0_ZeroOne指示.md」のファイルを読んで、Phase5を実行してください。注意：このファイルはRDRA_Knowledge直下にあり、0_RDRAZeroOneフォルダ内ではありません');
    } else {
        console.log('すべてのフェーズが定義されています。');
    }
    waitForEnterThenNext();
}
/**
 * 関連データを作成しRDRAGraphを表示する
 */
function showRDRAGraph() {
    console.log('関連データを作成しています...');
    exec('node RDRA_Knowledge/helper_tools/makeGraphData.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`エラー: ${error}`);
            promptUser();
            return;
        }
        console.log('関連データの作成が完了しました。');
        console.log('RDRAGraphを表示しています...');

        const clipboardCmd = getClipboardCommand('1_RDRA/関連データ.txt');
        const browserCmd = getBrowserCommand('https://vsa.co.jp/rdratool/graph/v0.94/index.html?clipboard');

        if (!clipboardCmd || !browserCmd) {
            console.error('このOSではクリップボード操作またはブラウザ起動がサポートされていません。');
            promptUser();
            return;
        }

        exec(clipboardCmd, (clipError) => {
            if (clipError) {
                console.error(`クリップボードエラー: ${clipError}`);
            } else {
                console.log('データをクリップボードにコピーしました。');
                exec(browserCmd, (browserError) => {
                    if (browserError) {
                        console.error(`ブラウザ起動エラー: ${browserError}`);
                    } else {
                        console.log('ブラウザでRDRAGraphを開きました。');
                    }
                    promptUser();
                });
            }
        });
    });
}
/**
 * ZeroOneデータをクリップボードにコピーする
 */
function makeZeroOneData() {
    exec('node RDRA_Knowledge/helper_tools/makeZeroOneData.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`エラー: ${error}`);
            promptUser();
            return;
        }
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.error(stderr);
        }
    })
    console.log('ZeroOneデータの処理が完了しました。');
    console.log('データはクリップボードにコピーされました。スプレッドシートに貼り付けてください。');
    console.log('https://docs.google.com/spreadsheets/d/1h7J70l6DyXcuG0FKYqIpXXfdvsaqjdVFwc6jQXSh9fM/edit?gid=1240873646#gid=1240873646');
}
/**
 * 生成したファイルをRDRAフォルダーにコピーする
 */
function copyFilesToRDRA() {
    console.log('ファイルをRDRAフォルダーにコピーしています...');
    exec('node RDRA_Knowledge/helper_tools/rdraFileCopy.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`エラー: ${error}`);
        } else {
            console.log('ファイルのコピーが完了しました。');
            if (stdout) console.log(stdout);
        }
        promptUser();
    });
}
/**
 * ブラウザで画面編集を開く
 */
function openUIInBrowser() {
    const browserCmd = getBrowserCommand('http://localhost:3000/');
    if (!browserCmd) {
        console.error('このOSではブラウザ起動がサポートされていません。');
        return;
    }
    exec(browserCmd, (browserError) => {
        if (browserError) {
            console.error(`ブラウザ起動エラー: ${browserError}`);
        }
    });
}

/**
 * 画面編集サーバーを起動する
 */
function startUIServer() {
    console.log('画面編集を表示します...');
    
    // 既にサーバーが起動しているかチェック
    if (global.serverProcess && !global.serverProcess.killed) {
        console.log('サーバーは既に起動しています。ブラウザで画面を開きます...');
        openUIInBrowser();
        console.log('画面編集を表示しました。');
        promptUser();
        return;
    }
    
    const serverProcess = spawn('node', ['RDRA_Knowledge/helper_tools/web_tool/ui_server.js'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false
    });
    
    serverProcess.stdout.on('data', (data) => {
        console.log(`サーバー出力: ${data}`);
        // ui_server.jsが自動的にブラウザを開くので、ここでは開かない
    });
    
    serverProcess.stderr.on('data', (data) => {
        const errorMsg = data.toString();
        console.error(`サーバーエラー: ${errorMsg}`);
        // ポートが既に使用されている場合
        if (errorMsg.includes('EADDRINUSE')) {
            console.log('ポート3000は既に使用されています。既存のサーバーに接続します。');
            openUIInBrowser();
            promptUser();
        }
    });
    
    serverProcess.on('spawn', () => {
        console.log('画面編集サーバーを起動しました。');
        console.log('画面の「閉じる」ボタンでサーバーを停止できます。');
        promptUser();
    });
    
    serverProcess.on('error', (error) => {
        console.error(`エラー: ${error}`);
        promptUser();
    });
    
    serverProcess.on('close', (code) => {
        console.log(`サーバープロセスが終了しました。終了コード: ${code}`);
        global.serverProcess = null;
    });
    
    // プロセスIDを保存して後で終了できるようにする
    global.serverProcess = serverProcess;
}
/**
 * アクター別画面サーバーを起動する
 */
function startActorScreenServer() {
    console.log('アクター別画面を表示します...');
    const serverProcess = spawn('node', ['RDRA_Knowledge/helper_tools/web_tool/actorUI_server.js'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false
    });
    serverProcess.stdout.on('data', (data) => {
        console.log(`サーバー出力: ${data}`);
    });
    serverProcess.stderr.on('data', (data) => {
        console.error(`サーバーエラー: ${data}`);
    });
    serverProcess.on('spawn', () => {
        console.log('アクター別画面サーバーを起動しました。');
        promptUser();
    });
    serverProcess.on('error', (error) => {
        console.error(`エラー: ${error}`);
        promptUser();
    });
    serverProcess.on('close', (code) => {
        console.log(`サーバープロセスが終了しました。終了コード: ${code}`);
        promptUser();
    });     
    // プロセスIDを保存して後で終了できるようにする
    global.serverProcess = serverProcess;
}
/**
 * アクター別画面を表示する
 */
function showActorUI() {
    console.log('アクター別画面を表示する');
    const fs = require('fs');
    const uiJsonPath = '2_RDRASpec/ui.json';
    if (!fs.existsSync(uiJsonPath)) {
        console.error('エラー: 2_RDRASpec/ui.jsonが存在しません。');
        console.error('先にメニュー21で仕様ファイルを作成してください。');
        promptUser();
        return;
    }
    console.log('ui.jsonをアクター別データに変換しています...');
    exec('node RDRA_Knowledge/helper_tools/convertUI2ActorUI.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`エラー: ${error.message}`);
            if (stderr) console.error(`詳細: ${stderr}`);
            promptUser();
            return;
        }
        if (stdout) console.log(stdout);
        
        // 既にサーバーが起動しているかチェック
        if (global.actorScreenServer && !global.actorScreenServer.killed) {
            console.log('サーバーは既に起動しています。ブラウザで画面を開きます...');
            const browserCmd = getBrowserCommand('http://localhost:3001/');
            if (browserCmd) {
                exec(browserCmd, (browserError) => {
                    if (browserError) {
                        console.error(`ブラウザ起動エラー: ${browserError}`);
                    }
                });
            }
            console.log('アクター別画面を表示しました。');
            promptUser();
            return;
        }
        
        console.log('HTTPサーバーを起動してブラウザで画面を開きます...');
        
        // HTTPサーバーを起動
        const serverProcess = spawn('node', ['RDRA_Knowledge/helper_tools/web_tool/actorUI_server.js'], {
            stdio: ['pipe', 'pipe', 'pipe'],
            detached: false
        });
        
        let serverStarted = false;
        
        serverProcess.stdout.on('data', (data) => {
            console.log(`${data}`);
            if (!serverStarted && data.toString().includes('簡易HTTPサーバーが起動しました')) {
                serverStarted = true;
                // サーバー起動後、少し待ってからブラウザを開く
                setTimeout(() => {
                    const browserCmd = getBrowserCommand('http://localhost:3001/');
                    if (browserCmd) {
                        exec(browserCmd, (browserError) => {
                            if (browserError) {
                                console.error(`ブラウザ起動エラー: ${browserError}`);
                            }
                        });
                    }
                }, 500);
            }
        });
        
        serverProcess.stderr.on('data', (data) => {
            console.error(`${data}`);
        });
        
        serverProcess.on('error', (error) => {
            console.error(`サーバー起動エラー: ${error}`);
        });
        
        serverProcess.on('close', (code) => {
            console.log('アクター別画面サーバーが終了しました。');
            global.actorScreenServer = null;
        });
        
        // プロセスIDを保存
        global.actorScreenServer = serverProcess;
        
        console.log('アクター別画面を表示しました。');
        console.log('画面の「閉じる」ボタンでサーバーを停止できます。');
        console.log('または、メニューから「5. 画面編集を終了する」を選択してください。');
        promptUser();
    });
}
/**
 * 起動中のサーバーを終了する
 */
function stopServers() {
    let serverStopped = false;
    if (global.serverProcess) {
        console.log('画面編集サーバーを終了しています...');
        global.serverProcess.kill('SIGTERM');
        global.serverProcess = null;
        serverStopped = true;
    }
    if (global.actorScreenServer) {
        console.log('アクター別画面サーバーを終了しています...');
        global.actorScreenServer.kill('SIGTERM');
        global.actorScreenServer = null;
        serverStopped = true;
    }
    if (!serverStopped) {
        console.log('起動中のサーバーはありません。');
    } else {
        console.log('サーバーを終了しました。');
    }
    promptUser();
}
/**
 * 生成された成果物を削除する
 */
function deleteGeneratedFiles() {
    console.log('生成された成果物を削除しています...');
    exec('node RDRA_Knowledge/helper_tools/deleteFiles.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`エラー: ${error}`);
        } else {
            console.log('成果物の削除が完了しました。');
            if (stdout) console.log(stdout);
        }
        promptUser();
    });
}
/**
 * プログラムを終了する
 */
function exitProgram() {
    console.log('プログラムを終了します。');
    if (global.serverProcess) {
        global.serverProcess.kill('SIGTERM');
    }
    if (global.actorScreenServer) {
        global.actorScreenServer.kill('SIGTERM');
    }
    if (global.prototypeServer) {
        global.prototypeServer.kill('SIGTERM');
    }
    rl.close();
    process.exit(0);
}
function promptUser() {
    showMenu();
    rl.question('> ', (answer) => {
        executeOption(answer.trim());
    });
}

console.log('コマンド実行メニュー');
promptUser();
