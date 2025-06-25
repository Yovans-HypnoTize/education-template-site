import { Backdrop as MuiBackdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useAppSelector } from "../app/hooks";

interface IBackDrop {
  [key: string]: any;
}
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const scaleAnimation = keyframes`
  0%, 40%, 100% {
    transform: scaleY(1);
  }
  20% {
    transform: scaleY(1.5);
  }
`;

const loaderContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 6px;
`;

const bar = css`
  width: 6px;
  height: 40px;
  background-color: #4f46e5;
  border-radius: 2px;
  animation-name: ${scaleAnimation};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1.2s;
`;

const delays = [0, 0.15, 0.3, 0.45, 0.6];

const BackDrop: React.FC<IBackDrop> = () => {
  const { loading } = useAppSelector((state) => state.auth);
  return (
    <MuiBackdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.modal + 1 })} open={loading}>
      {/* <CircularProgress color="inherit" /> */}
      <div css={loaderContainer}>
        {delays.map((delay, idx) => (
          <div
            key={idx}
            css={css`
              ${bar};
              animation-delay: ${delay}s;
            `}
          />
        ))}
      </div>
    </MuiBackdrop>
  );
};

export default BackDrop;
