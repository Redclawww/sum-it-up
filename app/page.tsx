"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getSummary } from "@/lib/actions/summary";
import ReactMarkdown from "react-markdown";
// import {  SignedIn, SignedOut } from '@clerk/clerk-react';
// import {  SignUp,SignOutButton } from "@clerk/nextjs";

export default function Home() {
  async function Summary(url: string) {
    setLoading(true);
    try {
      const summary = await getSummary(url);
      if(summary){
        setSummary(summary);
      }
      else{
        alert("No summary available for this video. Please try another video.");
      }
    } catch (error) {
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  }
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  return (
    <main className="flex items-center flex-col gap-10 justify-center  w-full py-10">     
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        Sum It Up
      </h1>
      <p className="text-center text-white text-2xl">Discover insightful summaries of exciting YouTube videos with just a click! Explore our collection of diverse <br />topics and find the content that piques your interest.</p>
      <Input
        type="url"
        className="md:w-[60vh] rounded-full"
        placeholder="Enter the Url"
        value={url}
        onChange={(event) => {
          setUrl(event.target.value);
        }}
      />
      <Button
        onClick={() => {
          Summary(url);
        }}
      >
        Get Summary
      </Button>
      {loading && (
        <div className="animate-pulse bg-gray-200 h-[40vh] w-60 rounded-md"></div>
      )}
      {!loading && summary && (
        <div className="bg-white text-bold px-10 py-10 rounded-xl w-[90vw] md:w-[60vw] relative">
          {" "}
          <ReactMarkdown>{summary}</ReactMarkdown>
          <button
            className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors duration-200"
            onClick={() => {
              navigator.clipboard.writeText(summary);
              alert("Copied to clipboard");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}
