// DebugComponent.tsx
import React from "react";
import { useParams } from "react-router-dom";

const DebugComponent: React.FC = () => {
  const params = useParams();
  console.log("Params:", params);

  return <div>Check console for params</div>;
};

export default DebugComponent;
