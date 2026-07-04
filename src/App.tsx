import React, { useState, useEffect, useRef } from "react";
import Markdoc from "@markdoc/markdoc";
import { parseDocs } from "./markdoc";

// MUI Imports
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

// Define types for navigation items
interface NavItem {
  id: string;
  title: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAVIGATION: NavGroup[] = [
  {
    title: "GETTING STARTED",
    items: [
      { id: "api-reference", title: "API Reference" },
      { id: "authentication", title: "Authentication" },
      { id: "errors", title: "Errors" },
      { id: "handling-errors", title: "Handling errors" },
    ],
  },
  {
    title: "CORE CONCEPTS",
    items: [
      { id: "expanding-responses", title: "Expanding Responses" },
      { id: "idempotent-requests", title: "Idempotent requests" },
      { id: "include-dependent-response-values", title: "Include-dependent values" },
      { id: "metadata", title: "Metadata" },
    ],
  },
  {
    title: "PAGINATION & SEARCH",
    items: [
      { id: "pagination", title: "Pagination" },
      { id: "search", title: "Search" },
      { id: "auto-pagination", title: "Auto-pagination" },
    ],
  },
  {
    title: "ADVANCED TOPICS",
    items: [
      { id: "request-ids", title: "Request IDs" },
      { id: "connected-accounts", title: "Connected Accounts" },
      { id: "versioning", title: "Versioning" },
    ],
  },
];

// Fence component for syntax highlighting & copy functionality
function FenceComponent({
  content,
  language,
}: {
  content: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-(--color-border-dark) bg-(--color-code-bg) text-sm font-mono mb-4 shadow-lg">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#505865] border-b border-(--color-border-dark) text-(--color-text) uppercase tracking-wider font-semibold select-none">
        <span>{language?.replaceAll("_", " ") || "code"}</span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors duration-150 flex items-center gap-1 cursor-pointer"
        >
          {copied ? (
            <span className="text-emerald-400 font-medium lowercase">
              copied!
            </span>
          ) : (
            <span>copy</span>
          )}
        </button>
      </div>
      {/* Code Body */}
      <pre className="py-2 px-4 overflow-x-auto text-(--color-text-code) bg-[#474e5a] leading-relaxed">
        <code>{content}</code>
      </pre>
    </div>
  );
}

// Right Component (Wrapper for the Right Column)
function RightComponent({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}

// Section Component (Stripe Split Column)
function SectionComponent({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  // Separate content: children that are RightComponent go to the right, others go to the left
  const leftChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type as any).name !== "RightComponent",
  );
  const rightChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type as any).name === "RightComponent",
  );

  return (
    <section
      id={id}
      data-section-title={title}
      className="section-row border-b border-(--color-border-light) flex flex-col lg:flex-row w-full min-h-100 last:border-b-0 min-w-0"
    >
      {/* Left side: rich text */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 min-w-0">
        <h2 className="text-2xl font-bold text-(--color-text-primary) mb-6 scroll-mt-24">
          {title}
        </h2>
        <div className="text-(--color-text-primary) text-[14px] leading-relaxed space-y-4 prose prose-slate">
          {leftChildren}
        </div>
      </div>

      {/* Right side: sticky code blocks */}
      <div className="w-full lg:w-1/2 text-(--color-text-code) relative min-w-0">
        <div className="lg:sticky lg:top-19 p-8 lg:p-12 space-y-6 right-column-content">
          {rightChildren}
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [activeSection, setActiveSection] = useState("api-reference");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      "GETTING STARTED": true,
      "CORE CONCEPTS": true,
      "PAGINATION & SEARCH": true,
      "ADVANCED TOPICS": true,
    },
  );

  // MUI Dropdowns states
  const [versionAnchor, setVersionAnchor] = useState<null | HTMLElement>(null);
  const [apiLanguageAnchor, setApiLanguageAnchor] =
    useState<null | HTMLElement>(null);
  const [selectedVersion, setSelectedVersion] = useState("2026-07-04");
  const [selectedLanguage, setSelectedLanguage] = useState("Node.js");

  const contentRef = useRef<HTMLDivElement>(null);

  // Toggle navigation categories
  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  // Scroll active section into view smoothly
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Setup ScrollSpy using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies the middle/upper viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    // Observe each section row
    const sections = document.querySelectorAll(".section-row");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const renderedDocs = Markdoc.renderers.react(parseDocs(), React, {
    components: {
      Section: SectionComponent,
      Right: RightComponent,
      Fence: FenceComponent,
    },
  });

  return (
    <div className="flex min-h-screen bg-(--color-code-bg)">
      {/* 250px Sidebar (left) */}
      <aside className="w-(--sidebar-width) h-screen fixed top-0 left-0 border-r border-(--color-border-light) flex flex-col z-20">
        {/* Header 'stripe' */}
        <div className="p-4 flex items-center">
          <span className="text-[16px] font-black tracking-0 text-(--color-text-primary) flex items-center gap-0 select-none">
            stripe
            <span className="text-[14px] uppercase font-bold tracking-wide text-[#69b6e3] ml-1 bg-slate-800 px-1.5 py-0.5 rounded">
              api
            </span>
          </span>
        </div>

        {/* Search Bar - 30px height, underneath header */}
        <div className="px-4 pb-2">
          <div className="relative flex items-center">
            <SearchIcon
              className="absolute left-2.5 text-(--color-text-muted)"
              style={{ fontSize: 16 }}
            />
            <input
              type="text"
              placeholder="Find anything..."
              className="w-full h-7.5 pl-8 pr-10 rounded-md border border-(--color-border-light) bg-(--color-code-bg) text-xs text-(--color-text-primary) placeholder-(--color-text-muted) focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all-custom"
            />
            <span className="absolute right-2 text-[9px] font-semibold text-(--color-text-muted) bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/60 select-none">
              /
            </span>
          </div>
        </div>

        {/* Navigation list (Expandable groups, scrollable only on hover) */}
        <div className="flex-1 sidebar-scroll-container sidebar-scroll pb-4 px-3 space-y-4 select-none">
          {NAVIGATION.map((group) => {
            const isExpanded = expandedGroups[group.title];
            return (
              <div key={group.title} className="space-y-1.5">
                {/* Group Title Accordion Header */}
                <div
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold tracking-wider text-(--color-text-muted) cursor-pointer transition-all-custom"
                >
                  <span className="text-(--color-text-primary)">{group.title}</span>
                  {isExpanded ? (
                    <ExpandMoreIcon
                      className="w-3.5 h-3.5"
                      style={{ fontSize: 14 }}
                    />
                  ) : (
                    <ChevronRightIcon
                      className="w-3.5 h-3.5"
                      style={{ fontSize: 14 }}
                    />
                  )}
                </div>

                {/* Group Items (Expandable) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="space-y-0.5 pl-1.5 ml-1">
                    {group.items.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all-custom flex items-center justify-between cursor-pointer ${
                              isActive
                                ? "bg-(--color-primary-light) text-(--color-primary)"
                                : "text-(--color-text-secondary)"
                            }`}
                          >
                            <span>{item.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Right Window */}
      <div className="flex-1 min-h-screen pl-(--sidebar-width) min-w-0 flex flex-col">
        {/* 60px height top navbar */}
        <header className="h-(--navbar-height) bg-(--color-code-bg) border-b border-(--color-border-light) sticky top-0 z-10 flex items-center justify-between px-8 select-none">
          <div/>

          {/* 5 inline buttons snapped to the right */}
          <div className="flex items-center gap-0">
            {/* Version Dropdown */}
            <Button
              size="small"
              onClick={(e) => setVersionAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                color: "var(--color-text-primary)",
                fontSize: "14px",
                fontWeight: 600
              }}
            >
              {selectedVersion}
            </Button>
            <Menu
              anchorEl={versionAnchor}
              open={Boolean(versionAnchor)}
              onClose={() => setVersionAnchor(null)}
            >
              {["2026-07-04", "2025-10-10", "2025-05-18", "2024-12-01"].map(
                (v) => (
                  <MenuItem
                    key={v}
                    onClick={() => {
                      setSelectedVersion(v);
                      setVersionAnchor(null);
                    }}
                    selected={selectedVersion === v}
                    sx={{ fontSize: "14px" }}
                  >
                    {v} {v === "2026-07-04" && "(latest)"}
                  </MenuItem>
                ),
              )}
            </Menu>

            {/* API Reference Language Dropdown */}
            <Button
              size="small"
              onClick={(e) => setApiLanguageAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                color: "var(--color-primary)",
                fontSize: "14px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                },
              }}
            >
              API Reference
            </Button>
            <Menu
              anchorEl={apiLanguageAnchor}
              open={Boolean(apiLanguageAnchor)}
              onClose={() => setApiLanguageAnchor(null)}
            >
              {[
                "Stripe.js",
                "Stripe CLI",
                "IOS",
                "Android",
                "React Native"
              ].map((l) => (
                <MenuItem
                  key={l}
                  onClick={() => {
                    setSelectedLanguage(l);
                    setApiLanguageAnchor(null);
                  }}
                  selected={selectedLanguage === l}
                  sx={{ fontSize: "14px" }}
                >
                  {l}
                </MenuItem>
              ))}
            </Menu>

            {/* Docs Link */}
            <Button
              href="#docs"
              sx={{
                textTransform: "none",
                color: "var(--color-primary)",
                fontSize: "14px",
                fontWeight: 500,
                "&:hover": { color: "var(--color-primary)" },
              }}
            >
              Docs
            </Button>

            {/* Support Link */}
            <Button
              href="#support"
              sx={{
                textTransform: "none",
                color: "var(--color-primary)",
                fontSize: "14px",
                fontWeight: 500,
                "&:hover": { color: "var(--color-primary)" },
              }}
            >
              Support
            </Button>

            {/* Sign in CTA Button */}
            <Button
              sx={{
                textTransform: "none",
                color: "var(--color-primary)",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "6px",
                padding: "4px 14px",
                marginLeft: "8px",
              }}
            >
              Sign in &rarr;
            </Button>
          </div>
        </header>

        {/* Body content taking rest of screen */}
        <main ref={contentRef} className="flex-1 w-full min-w-0 flex flex-col">
          {renderedDocs}
        </main>
      </div>
    </div>
  );
}

export default App;
