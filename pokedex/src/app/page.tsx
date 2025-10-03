"use client";
import React from "react";
import { Carousel, Image, Row, Col } from "antd";

export default function Home() {
  function buildCarouselItems() {
    return (
      <Carousel
        autoplay
      >
        <div>
          <Image src="/assets/carousel/carousal1.jpg" alt="Image 1" />
        </div>
        <div>
          <Image src="/assets/carousel/carousal2.jpg" alt="Image 2" />
        </div>
        <div>
          <Image src="/assets/carousel/carousal3.jpg" alt="Image 3" />
        </div>
      </Carousel>
    );
  }

  function buildStaticBanner(src: string, alt: string) {
    return (
      <div>
        <Image src={src} alt={alt} />
      </div>
    );
  }

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "10vh", margin: "20px" }}
      >
        <Col lg={16} style={{ textAlign: "center" }}>
          <div>{buildCarouselItems()}</div>
        </Col>
        <Col lg={7} style={{ margin: "20px" }}>
          <div>
            {buildStaticBanner("/assets/banner/banner1.jpg", "Banner 1")}
            {buildStaticBanner("/assets/banner/banner2.jpg", "Banner 2")}
          </div>
        </Col>
      </Row>
    </>
  );
}
