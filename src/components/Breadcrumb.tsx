import React from "react";

type BreadcrumbProps = {
  history: { id: string, search: string, name: string, type: string}[];
  onBack: () => void;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ history, onBack }) => (
  <div className="bg-gray-800 p-4 flex items-center space-x-2">
    <button
      onClick={onBack}
      className="text-blue-400 hover:underline disabled:opacity-50"
      disabled={history.length === 0}
    >
      Back
    </button>
    {history.map((item, index) => (
      <span key={item.id} className="text-gray-400">
        {item.name} {index < history.length - 1 && ">"}
      </span>
    ))}
  </div>
);

export default Breadcrumb;
