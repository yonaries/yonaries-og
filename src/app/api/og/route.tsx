import { ImageResponse } from "@vercel/og";
import { NextRequest } from 'next/server';

export const runtime = "edge";

export async function GET(req: NextRequest) {

  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");

  try {
    return new ImageResponse(
    <BackgroundCanvas>
      <BlogPostContent title={postTitle} />
    </BackgroundCanvas>, {
      width: 1200,
      height: 630,
    });
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};


const BackgroundCanvas = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "32px",
        background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)"
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          padding: "64px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const BlogPostContent = ({ title }: { title: string }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "720px" }}
    >
      <span
        style={{
          fontWeight: 900,
          fontSize: "48px",
          lineHeight: "56px",
          color: "#fff",
        }}
      >
        {title}
      </span>

      <div style={{ display: "flex", marginTop: "250px" }}>
        <img
          alt="yonaries github avatar"
          height={50}
          src="http://yonaries.tech/avatar.png"
          width={50}
          style={{
            borderRadius: "50%"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "25px",
          }}
        >
          <span
            style={{
              fontSize: "26px",
              color: "#fff",
              fontWeight: 800,
              marginTop: "-5px",
            }}
          >
            Yonathan Dejene
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#f5f5f5",
              fontWeight: 500,
            }}
          >
            Designer and Developer
          </span>
        </div>
      </div>
    </div>
  );
};