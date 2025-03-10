"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Clock, Search, Tag, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Sample blog posts
const blogPosts = [
  {
    id: "understanding-evm-execution",
    title: "Understanding EVM Execution: A Deep Dive",
    excerpt:
      "Explore the inner workings of the Ethereum Virtual Machine and how it executes smart contract code step by step.",
    author: "Alex Johnson",
    date: "2023-05-15",
    readTime: "8 min read",
    tags: ["EVM", "Smart Contracts", "Ethereum"],
    category: "technical",
  },
  {
    id: "gas-optimization-techniques",
    title: "Advanced Gas Optimization Techniques for Smart Contracts",
    excerpt:
      "Learn how to optimize your smart contracts to reduce gas costs and improve efficiency on the Ethereum network.",
    author: "Samantha Lee",
    date: "2023-06-22",
    readTime: "12 min read",
    tags: ["Gas Optimization", "Smart Contracts", "Solidity"],
    category: "technical",
  },
  {
    id: "visualizing-defi-transactions",
    title: "Visualizing DeFi Transactions: Uniswap Swaps Explained",
    excerpt: "A visual breakdown of what happens under the hood when you perform a token swap on Uniswap.",
    author: "Michael Chen",
    date: "2023-07-10",
    readTime: "10 min read",
    tags: ["DeFi", "Uniswap", "Visualization"],
    category: "defi",
  },
  {
    id: "evm-for-beginners",
    title: "EVM for Beginners: Understanding the Basics",
    excerpt: "A beginner-friendly introduction to the Ethereum Virtual Machine and how it powers smart contracts.",
    author: "Emily Rodriguez",
    date: "2023-08-05",
    readTime: "6 min read",
    tags: ["EVM", "Beginners", "Ethereum"],
    category: "educational",
  },
  {
    id: "debugging-smart-contracts",
    title: "Debugging Smart Contracts with EVM Visualizer",
    excerpt: "Learn how to use the EVM Visualizer to debug and understand complex smart contract interactions.",
    author: "David Kim",
    date: "2023-09-18",
    readTime: "9 min read",
    tags: ["Debugging", "Smart Contracts", "Tools"],
    category: "technical",
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter blog posts based on search term and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">EVM Visualizer Blog</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Insights, tutorials, and deep dives into Ethereum Virtual Machine concepts and smart contract development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/blog/${post.id}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">No articles found matching your criteria.</p>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Button asChild>
            <Link href="/blog/archive">View All Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

