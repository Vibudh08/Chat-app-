import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useEffect } from "react";
import { context } from "../../context/Context";


const Sidebar = () => {
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    isOpen,
    setIsOpen
  } = useContext(context);

  const handleSidebarClick = () => {
    if (window.innerWidth < 600) {
      setIsOpen(true);
    }
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <>
      {/* {extended ? ( */}
      <div
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        onClick={handleSidebarClick}
      >
        <div className="top">
          {/* <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtended((prev) => (prev === true ? false : true))}
        /> */}
          <div onClick={() => newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            <p>New Chat</p>
          </div>

          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            <p>Help</p>
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            <p>Activity</p>
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            <p>Setting</p>
          </div>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
    </>
  );
};
export default Sidebar;
