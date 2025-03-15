import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────
// Homeコンポーネント：ホームページ全体のレイアウトを構築
// 各セクション（ヒーロー、特徴、人気のサークル、FAQ、CTA）をサブコンポーネントに分割して実装
// ─────────────────────────────
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <FeatureSection />
      <PopularCirclesSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

// ─────────────────────────────
// HeroSectionコンポーネント：トップのヒーローセクション
// ・大きな見出しとサブテキストを表示
// ・「サークルを探す」「サークルを登録する」ボタンを配置
// ─────────────────────────────
function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        {/* メインタイトル */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          あなたにぴったりの
          <br />
          バドミントンサークルを見つけよう
        </h1>
        {/* サブタイトル：サービスの概要を伝える */}
        <p className="text-xl md:text-2xl mb-10 max-w-3xl">
          地域、レベル、活動頻度など、あなたの希望条件に合わせて
          <br className="hidden md:inline" />
          最適なバドミントンサークルをご紹介します
        </p>
        {/* 行動を促す2つのボタン */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            href="/search"
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg text-lg transition-colors w-full text-center"
          >
            サークルを探す
          </Link>
          <Link
            href="/register-circle"
            className="bg-transparent hover:bg-blue-700 text-white border-2 border-white font-bold py-3 px-6 rounded-lg text-lg transition-colors w-full text-center"
          >
            サークルを登録する
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────
// FeatureSectionコンポーネント：サービスの特徴を紹介するセクション
// ・複数の特徴（検索条件、詳細情報、申請の簡単さ）をカード形式で表示
// ─────────────────────────────
function FeatureSection() {
  // 特徴情報の配列
  const features = [
    {
      title: "多彩な検索条件",
      description:
        "地域、活動頻度、レベル、会費など多角的な条件からあなたにぴったりのサークルを見つけられます",
      icon: "🔍",
    },
    {
      title: "詳細なサークル情報",
      description:
        "メンバー構成、活動実績、写真・動画ギャラリー、口コミ・レビューなど豊富な情報を提供",
      icon: "📊",
    },
    {
      title: "簡単サークル申請",
      description:
        "気になるサークルへの参加申請がワンクリックで完了。サークル管理者とのスムーズな連絡も可能です",
      icon: "✉️",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">
          バドミントンサークルファインダーの特徴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {/* アイコン表示 */}
              <div className="text-4xl mb-4">{feature.icon}</div>
              {/* 特徴のタイトル */}
              <h3 className="text-xl font-bold mb-3 dark:text-white">
                {feature.title}
              </h3>
              {/* 特徴の説明 */}
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────
// PopularCirclesSectionコンポーネント：人気のサークルを一覧表示するセクション
// ・ダミーデータを利用してサークルカードを生成（将来的にはAPI連携を検討）
// ・各カードに評価、料金、詳細リンクを表示
// ─────────────────────────────
function PopularCirclesSection() {
  // 仮の人気サークルデータ（実際のデータ取得処理に置き換え可能）
  const popularCircles = [1, 2, 3];

  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">
          人気のサークル
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCircles.map((circleId, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 画像または背景のプレースホルダー */}
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400" />
              </div>
              <div className="p-6">
                {/* サークル名 */}
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  サークル{circleId}
                </h3>
                {/* 評価表示 */}
                <div className="flex items-center mb-2">
                  <div className="text-yellow-400 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    (42件)
                  </span>
                </div>
                {/* 詳細情報 */}
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  東京都渋谷区 • 初心者歓迎 • 週2回
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold dark:text-white">
                    月会費：3,000円
                  </span>
                  <Link
                    href={`/circles/${circleId}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    詳細を見る →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 全サークル一覧へのリンク */}
        <div className="text-center mt-12">
          <Link
            href="/search"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            すべてのサークルを見る
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────
// FAQSectionコンポーネント：よくある質問を表示するセクション
// ・FAQデータを配列で管理し、各質問と回答をカード形式で表示
// ─────────────────────────────
function FAQSection() {
  // FAQの内容（質問と回答のペア）
  const faqs = [
    {
      question: "初心者でも参加できるサークルはありますか？",
      answer:
        "はい、多くのサークルが初心者歓迎のポリシーを持っています。検索機能で「初心者歓迎」の条件を選択することで、あなたに適したサークルを見つけることができます。",
    },
    {
      question: "サークルへの参加方法を教えてください",
      answer:
        "サークル詳細ページから「参加申請」ボタンをクリックし、必要事項を入力するだけで簡単に申請できます。サークル管理者による承認後、参加が確定します。",
    },
    {
      question: "サークルの情報は最新ですか？",
      answer:
        "サークル管理者により定期的に情報が更新されています。最終更新日はサークル詳細ページで確認できます。古い情報を見つけた場合は報告機能をご利用ください。",
    },
    {
      question: "自分のサークルを登録するにはどうすればいいですか？",
      answer:
        "トップページの「サークルを登録する」ボタンから、必要情報を入力するだけで簡単に登録できます。写真やサークル活動の詳細情報を充実させることで、より多くの方に見つけてもらいやすくなります。",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">
          よくある質問
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold mb-3 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────
// CTASectionコンポーネント：行動を促すコールトゥアクションセクション
// ・再度、ユーザーにサークル検索を促すメッセージとボタンを配置
// ─────────────────────────────
function CTASection() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          あなたにぴったりのサークルを見つけよう
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          全国各地のバドミントンサークルがあなたを待っています。
          今すぐ検索して、新しい仲間と出会いましょう。
        </p>
        <Link
          href="/search"
          className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-10 rounded-lg text-lg inline-block transition-colors"
        >
          サークルを探す
        </Link>
      </div>
    </section>
  );
}
