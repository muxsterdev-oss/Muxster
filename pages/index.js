import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useState } from 'react';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new MetaMaskConnector() });
  const { disconnect } = useDisconnect();
  const [post, setPost] = useState('');
  const [feed, setFeed] = useState([]);

  const handlePost = () => {
    if (post.trim()) {
      setFeed([{ text: post, author: address || 'Anonymous', ts: Date.now() }, ...feed]);
      setPost('');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-6">Muxster</h1>

      {!isConnected ? (
        <button
          onClick={() => connect()}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">Connected as {address}</p>
          <button
            onClick={() => disconnect()}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            Disconnect
          </button>
        </div>
      )}

      {isConnected && (
        <div className="w-full max-w-md mb-8">
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border rounded-lg p-3 mb-2"
          />
          <button
            onClick={handlePost}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Post
          </button>
        </div>
      )}

      <div className="w-full max-w-md space-y-4">
        {feed.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-800">{item.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              by {item.author} — {new Date(item.ts).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
