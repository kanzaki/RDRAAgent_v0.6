const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const HOST = 'localhost';

// actor_ui.jsonの実際の場所（2_RDRASpecディレクトリ）
const ACTOR_UI_JSON_PATH = path.join(__dirname, '../../../2_RDRASpec/actor_ui.json');

// MIMEタイプのマッピング
const mimeTypes = {
    '.html': 'text/html',
    '.json': 'application/json',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // シャットダウンエンドポイント
    if (req.url === '/shutdown') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ message: 'サーバーをシャットダウンします' }), 'utf-8');
        console.log('シャットダウンリクエストを受信しました。サーバーを終了します...');
        setTimeout(() => {
            server.close(() => {
                console.log('サーバーが正常に終了しました。');
                process.exit(0);
            });
        }, 100);
        return;
    }

    // URLからファイルパスを取得
    let filePath;
    if (req.url === '/') {
        filePath = path.join(__dirname, 'actorUI.html');
    } else if (req.url === '/actor_ui.json') {
        // actor_ui.jsonは2_RDRASpecディレクトリから読み込む
        filePath = ACTOR_UI_JSON_PATH;
    } else {
        filePath = path.join(__dirname, req.url);
    }

    // ファイルの拡張子を取得
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // ファイルを読み込んで返す
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`簡易HTTPサーバーが起動しました: http://${HOST}:${PORT}/`);
    console.log('サーバーを停止するには Ctrl+C を押してください');
});

// エラーハンドリング
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`エラー: ポート ${PORT} は既に使用されています。`);
        console.error('別のプロセスを終了してから再度実行してください。');
    } else {
        console.error('サーバーエラー:', error);
    }
    process.exit(1);
});

// プロセス終了時のクリーンアップ
process.on('SIGINT', () => {
    console.log('\nサーバーを終了しています...');
    server.close(() => {
        console.log('サーバーが終了しました。');
        process.exit(0);
    });
});

