import { useResolvedPath, useMatch, Link } from "react-router-dom";

export default function CustomLink({ name, icon, activeIcon, to }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      {match ? (
        <Link
          to={to}
          className="flex gap-4 p-2 no-underline text-white text-base cursor-pointer items-center rounded-md bg-pink-400"
        >
          {activeIcon}
          {name}
        </Link>
      ) : (
        <Link
          to={to}
          className="flex gap-4 p-2 no-underline text-gray-600 text-base cursor-pointer items-center rounded-md hover:bg-pink-100 focus:border focus:border-pink-200"
        >
          {icon}
          {name}
        </Link>
      )}
    </div>
  );
}
