import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Backend API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const POSTS_API = `${API_BASE_URL}/community/posts`;
const CREATE_POST_API = `${API_BASE_URL}/community/posts`;

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch posts from backend
  useEffect(() => {
    setLoading(true);
    fetch(POSTS_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Handle both array response or object with posts array
        setPosts(Array.isArray(data) ? data : data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError("Failed to load posts. Backend might not be running.");
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
        headers: { 
          "Content-Type": "application/json",
          // Add auth header if you have JWT token stored
          // "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          content: newPost,
          author: "Anonymous", // You can get this from user context
          createdAt: new Date().toISOString()
        })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      const created = await res.json();
      setPosts([created, ...posts]);
      setNewPost("");
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError(err.message || "Failed to create post. Check if backend is running.");
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
