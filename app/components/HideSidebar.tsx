"use client";

const HideSidebar = () => {
  return (
    <style global jsx>
      {`
        #sidebar {
          display: none !important;
        }

        #content {
          border-color: transparent !important;
        }
      `}
    </style>
  );
};

export default HideSidebar;
