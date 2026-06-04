import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ArticlesView from "./components/ArticlesView";
import ArticleDetailsView from "./components/ArticleDetailsView";
import ProjectsView from "./components/ProjectsView";
import ProjectDetailsView from "./components/ProjectDetailsView";
import VideosView from "./components/VideosView";
import VideoDetailsView from "./components/VideoDetailsView";
import GalleryView from "./components/GalleryView";
import AnnouncementsView from "./components/AnnouncementsView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";

import {
  ARTICLES,
  PROJECTS,
  VIDEOS,
  GALLERY,
  ANNOUNCEMENTS,
  TEAM,
} from "./data";
import { client } from "./sanity";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // Persistence block for bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("art-bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "post"]{
            title,
            slug,
            publishedAt,
            image
          }
        `);
const formattedPosts = data.map((post: any, index: number) => ({
  id: `post-${index}`,
  title: post.title,
  excerpt: "Blog post from Sanity CMS",

  content: post.title + "\n\nThis article was loaded from Sanity CMS.",

  category: "Software",
  tags: ["Sanity"],
 coverImage: post.image
  ? `https://cdn.sanity.io/images/1loueg6j/production/${post.image.asset._ref
      .replace("image-", "")
      .replace("-jpg", ".jpg")
      .replace("-png", ".png")
      .replace("-webp", ".webp")}`
  : "https://picsum.photos/800/400",
  date: new Date(post.publishedAt).toLocaleDateString(),
  readingTime: "2 min read",
  trending: false,
 author: {
  name: "ENGHUB",
  avatar: "https://i.pravatar.cc/150?img=1",
  role: "Engineering Blog",
},
views: Math.floor(Math.random() * 100),
likes: Math.floor(Math.random() * 20),
}));

        setPosts(formattedPosts);
        console.log(formattedPosts);
      } catch (err) {
        console.error("Failed to load posts from Sanity:", err);
      }
    };

    loadPosts();
  }, []);

  const handleToggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const isBookmarked = prev.includes(id);
      const next = isBookmarked
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("art-bookmarks", JSON.stringify(next));
      return next;
    });
  };

  const handleNavigateToPage = (page: string, id?: string) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (page === "article-details" && id) {
      setSelectedArticleId(id);
    } else if (page === "project-details" && id) {
      setSelectedProjectId(id);
    } else if (page === "video-details" && id) {
      setSelectedVideoId(id);
    }
    setCurrentPage(page);
  };

  // Find active data objects for detail pages
 const articleSource = posts.length > 0 ? posts : ARTICLES;

const activeArticle =
  articleSource.find((a) => a.id === selectedArticleId) || articleSource[0];
  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];
  const activeVideo = VIDEOS.find((v) => v.id === selectedVideoId) || VIDEOS[0];

  const relatedArticles = ARTICLES.filter(
    (a) => a.id !== activeArticle.id,
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Visual background lines accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-20 pointer-events-none z-0" />

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={(page) => handleNavigateToPage(page)}
        bookmarkCount={bookmarkedIds.length}
      />

      {/* Primary Page Canvas layout */}
      <main className="relative flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        {currentPage === "home" && (
          <HomeView
            articles={posts.length > 0 ? posts : ARTICLES}
            projects={PROJECTS}
            videos={VIDEOS}
            announcements={ANNOUNCEMENTS}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onNavigateToPage={handleNavigateToPage}
          />
        )}

        {currentPage === "articles" && (
          <ArticlesView
            articles={posts.length > 0 ? posts : ARTICLES}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onNavigateToPage={handleNavigateToPage}
          />
        )}

        {currentPage === "article-details" && activeArticle && (
          <ArticleDetailsView
            article={activeArticle}
            relatedArticles={relatedArticles}
            isBookmarked={bookmarkedIds.includes(activeArticle.id)}
            onToggleBookmark={handleToggleBookmark}
            onBack={() => handleNavigateToPage("articles")}
            onNavigateToArticle={(id) =>
              handleNavigateToPage("article-details", id)
            }
          />
        )}

        {currentPage === "projects" && (
          <ProjectsView
            projects={PROJECTS}
            onNavigateToPage={handleNavigateToPage}
          />
        )}

        {currentPage === "project-details" && activeProject && (
          <ProjectDetailsView
            project={activeProject}
            onBack={() => handleNavigateToPage("projects")}
          />
        )}

        {currentPage === "videos" && (
          <VideosView videos={VIDEOS} onNavigateToPage={handleNavigateToPage} />
        )}

        {currentPage === "video-details" && activeVideo && (
          <VideoDetailsView
            video={activeVideo}
            onBack={() => handleNavigateToPage("videos")}
          />
        )}

        {currentPage === "gallery" && <GalleryView galleryItems={GALLERY} />}

        {currentPage === "announcements" && (
          <AnnouncementsView announcements={ANNOUNCEMENTS} />
        )}

        {currentPage === "about" && <AboutView teamMembers={TEAM} />}

        {currentPage === "contact" && <ContactView />}
      </main>

      {/* Global Footer */}
      <Footer onPageChange={(page) => handleNavigateToPage(page)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export { AppContent };