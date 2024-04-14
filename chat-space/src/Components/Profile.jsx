import React from "react";
import "../styles/profile.scss";
import { Button, Col, Row } from "antd";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';
import "../styles/button.scss"

export default function Profile({ user, group, modeClass }) {
  const onDownload = () => {
    fetch(user?.profile_image)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  }

  return (
    <Row className={"profile " + modeClass}>
      <Col span={5}>
        <Button
          className="photo"
          onClick={(event) => {
            //that will stop to switch tab when anyone clicks to profile picture
            event.stopPropagation();
          }}
        >
          <Image
            src={user?.profile_image || user?.group_picture}
            preview={{
              toolbarRender: (
                _,
                {
                  transform: { scale },
                  actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                },
              ) => (
                <Space size={12} className="toolbar-wrapper">
                  <DownloadOutlined onClick={onDownload} />
                  <SwapOutlined rotate={90} onClick={onFlipY} />
                  <SwapOutlined onClick={onFlipX} />
                  <RotateLeftOutlined onClick={onRotateLeft} />
                  <RotateRightOutlined onClick={onRotateRight} />
                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                </Space>
              ),
            }}
          />
        </Button>
      </Col>
      {group?.length ? (<Col span={19}><div className="name">{user?.group_name}</div></Col>) :
        (<Col span={19}><div className="name">{user?.first_name + " " + user?.last_name}</div></Col>)}
    </Row>

  );
}
