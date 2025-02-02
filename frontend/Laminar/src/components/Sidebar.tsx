const Sidebar = () => {
    return (
      <div className="w-64 h-full bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">MailApp</h2>
        <nav className="mt-4">
          <ul>
            <li className="mb-2">
              <a href="/" className="block p-2 rounded hover:bg-gray-700">Inbox</a>
            </li>
            <li>
              <a href="/sent" className="block p-2 rounded hover:bg-gray-700">Sent</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  