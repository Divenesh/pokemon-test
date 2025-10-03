"use client";
import React from "react";
import { Carousel, Image, Row, Col, Button } from "antd";

export default function Home() {
  function buildCarouselItems() {
    return (
      <Carousel autoplay>
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

  function buildStaticImages(src: string, alt: string) {
    return (
      <div>
        <Image  src={src} alt={alt} />
      </div>
    );
  }

  function buildSearchBar() {
    return (
      <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
        <Col span={18}>
          <input style={{ width: "100%", height: "35px" }} type="text" placeholder="Pokemon Name ...." />
        </Col>
        <Col span={6} style={{ paddingLeft: "10px", textAlign: "left" }}>
          <Button type="primary" style={{ marginRight: "10px" }}>Search</Button>
        </Col>
      </Row>
    );
  }

  function buildPokemonCard() {
    return (
      <div style={{ border: "1px solid #eee", borderRadius: "5px", padding: "10px", textAlign: "center" }}>
        <Image src="/assets/pokemon/pokemon1.png" alt="Pokemon 1" />
        <h3>Pokemon Name</h3>
        <p>Type: Fire</p>
        <p>HP: 100</p>
        <Button type="primary">View Details</Button>
      </div>
    );
  }

  return (
    <>
      <div style={{ margin: "20px" }}>
        <Row justify="center" align="middle" style={{ minHeight: "10vh" }}>
          <Col lg={16} style={{ textAlign: "center" }}>
            <div>{buildCarouselItems()}</div>
          </Col>
          <Col lg={7} style={{ margin: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              {buildStaticBanner("/assets/banner/banner1.jpg", "Banner 1")}
            </div>
            <div>
              {buildStaticBanner("/assets/banner/banner2.jpg", "Banner 2")}
            </div>
          </Col>
        </Row>
        <Row justify="center" align="top" style={{ minHeight: "10vh", marginTop: "40px" }}>
          <Col lg={3} md={12} sm={24}>
            {buildStaticImages(
              "/assets/images/image1.png",
              "Static Image 1"
            )}
          </Col>
          <Col lg={13} md={12} sm={24} style={{ textAlign: "center" }}>
           <Row>
              <Col span={24}>{buildSearchBar()}</Col>
           </Row>
          </Col>
          <Col lg={7} md={12} sm={24} style={{ textAlign: "center" }}>
            {buildStaticImages(
              "/assets/images/image2.png",
              "Static Image 2"
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
