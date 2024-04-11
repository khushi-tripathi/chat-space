import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import About from "./About";
import TermsAndConditions from "./TermsAndConditions";
import CompleteSignUp from "./CompleteSignUp";
import { useNavigate } from "react-router-dom";
import "../styles/button.scss"

const steps = [
  {
    title: "First",
    content: <About />,
  },
  {
    title: "Second",
    content: <CompleteSignUp />,
  },
  {
    title: "Last",
    content: <TermsAndConditions />,
  },
];

export default function AfterSignUp() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <div className="sign-up">
      <div className="next-page">
        <Steps className="next-header" current={current} items={items} />
        <div className="next-content">{steps[current].content}</div>
        <div className="next-footer">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                message.success("Processing complete!");
                navigate("/chat");
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
