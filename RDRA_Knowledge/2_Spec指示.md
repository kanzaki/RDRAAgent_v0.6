# 前提の理解
「RDRA_Knowledge/1_RDRA」フォルダー内の以下のファイルの内容を十分に理解してください
「RDRA.md」と「HowToUseRDRA.md」「RDRASheet.md」「RDRAGraph.md」のファイルからRDRAの考え方とRDRASheetの構造,RDRAGraphの構造と相互の関係を理解してください
「1_RDRA」フォルダー内の各ファイルを読み込んで以下の指示に従ってください

# phase1:仕様ファイルの作成
「RDRA_Knowledge/2_RDRASpec」フォルダー内の以下のファイルの内容に従って処理を行います
- 「21_data.md」：論理データと論理データモデルの作り方を説明する
- 「22_ui.md」：ドメインモジュール定義の作り方を説明する
- 「23_business_rule.md」：ビジネスルールの作り方を説明する

## step1: 論理データの作成
「21_data.md」を元に論理データを作成する
作成したファイルは「2_RDRASpec」フォルダーの中に拡張子「tsv」で作成する

## step2: Mermaidの作成
「21_data.md」の論理データモデルを作成する
作成したDiagramは「2_RDRASpec」フォルダーに出力する

## step3: UIの作成
「22_ui.md」の画面モジュール定義を作成する
作成したUIは「2_RDRASpec」フォルダーに「ui.json」名で出力する

## step4: ビジネスルールを作成する
「23_business_rule.md」のビジネスルールモジュールを定義する
作成したビジネスルールは「2_RDRASpec」フォルダーに「business_rule.md」名で出力する

/*
    仕様の妥当性検証
*/
# phase2: 仕様の妥当性を検証する

## 検証対象
「2_RDRASpec」フォルダー配下の以下のファイルを読込み、検証する
- 「論理データモデル.md」を読込み十分に理解する
- 「ui.json」を読込み十分に理解する
- 「business_rule.md」を読込み十分に理解する

## 事前理解
- 「1_RDRA/Validation/RDRA説明.md」を読込、個別のストーリーの違いを理解する

## Phase1の成果物の妥当性検証

### phase1で作成した以下のファイルを十分に理解してください
- 2_RDRASpec/論理データモデル.md
- 2_RDRASpec/ui.json
- 2_RDRASpec/business_rule.md
- 2_RDRASpec/Validation/Spec妥当性検証ストーリー.md

### RDRA説明をベースにした妥当性検証
- 「RDRA_Knowledge/2_RDRASpec/specValidation.md」を実行し、「Spec妥当性検証結果.md」の名前で「2_RDRASpec/Validation」に出力する

Think Hard


