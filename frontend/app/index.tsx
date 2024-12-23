import Head from "next/head";
import TimeZoneSettings from "./TimeZone/page"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-600 to-purple-800">
      <Head>
        <title>Time Zone Settings</title>
        <meta name="description" content="Manage your time zone settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Render Time Zone Settings */}
      <TimeZoneSettings />
    </div>
  );
}
