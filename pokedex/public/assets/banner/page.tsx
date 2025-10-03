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
        <Col lg={8}>
          <div>
            {buildStaticBanner("/assets/carousel/banner1.jpg", "Banner 1")}
            {buildStaticBanner("/assets/carousel/banner2.jpg", "Banner 2")}
            {buildStaticBanner("/assets/carousel/banner3.jpg", "Banner 3")}
          </div>
        </Col>
      </Row>
    </>
  );
}
