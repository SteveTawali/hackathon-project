import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Replace with your backend API endpoints
const POSTS_API = "/api/posts";
const CREATE_POST_API = "/api/posts";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch posts from backend
  useEffect(() => {
    setLoading(true);
    fetch(POSTS_API)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts.");
        setLoading(false);
      });
  }, []);

  // Handle new post submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(CREATE_POST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost })
      });
      if (!res.ok) throw new Error("Failed to post");
      const created = await res.json();
      setPosts([created, ...posts]);
      setNewPost("");
    } catch {
      setError("Failed to create post.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold gradient-text text-center">Community</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Share something with the community..."
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !newPost.trim()}>
                Post
              </Button>
            </form>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          </CardContent>
        </Card>
        <div className="space-y-4">
          {loading && <div>Loading posts...</div>}
          {posts.length === 0 && !loading && <div className="text-muted-foreground text-center">No posts yet.</div>}
          {posts.map((post: any) => (
            <Card key={post.id} className="">
              <CardContent className="py-4">
                <div className="text-base text-foreground mb-2">{post.content}</div>
                <div className="text-xs text-muted-foreground">Posted by {post.author || "Anonymous"} on {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Just now"}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
