import React, { useState } from "react";
import { Button, message, Spin, Steps } from "antd";
import About from "./About";
import TermsAndConditions from "./TermsAndConditions";
import CompleteSignUp from "./CompleteSignUp";
import { useNavigate } from "react-router-dom";
import "../styles/button.scss"
import "../styles/page-layout.scss"

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
  const [loading, setLoading] = useState(false);
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
    <Spin spinning={loading}>
      <div className="sign-up page-layout">
        <div className="next-page box-layout">
          <Steps className="next-header" current={current} items={items} />
          <div className="next-content">{steps[current].content}</div>
          <div className="next-footer">

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
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  setLoading(true)
                  setTimeout(() => {
                    message.success("Welcome to Chat Space!");
                    navigate("/chat");
                  }, 500);
                }}
              >
                Done
              </Button>
            )}

          </div>
        </div>
      </div>
    </Spin>
  );
}
