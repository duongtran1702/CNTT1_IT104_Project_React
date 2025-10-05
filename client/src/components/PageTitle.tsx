import React from "react";

type PageTitleProps = {
  title: string;
  subtitle?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "10px 24px", // padding nhỏ lại
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <h2 className="text-[20px] font-semibold text-gray-700 m-0 p-0">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 mt-0.5 text-sm">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
