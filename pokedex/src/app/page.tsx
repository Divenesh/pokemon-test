"use client";
import React from "react";
import { Carousel, Image, Row, Col, Button } from "antd";
import { fetchPokemonData } from "../../api/PokemonData";
import { Pokemon } from "../../types/PokeTypes";

export default function Home() {
  const [pokemonData, setPokemonData] = React.useState<Pokemon[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData();
      setPokemonData(data);
    };

    fetchData();
  }, []);

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
        <Image src={src} alt={alt} />
      </div>
    );
  }

  function buildSearchBar() {
    return (
      <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
        <Col span={21}>
          <input
            style={{ width: "100%", height: "35px" }}
            type="text"
            placeholder="Pokemon Name ...."
          />
        </Col>
        <Col span={3} style={{ paddingLeft: "10px", textAlign: "left" }}>
          <Button type="primary">
            Search
          </Button>
        </Col>
      </Row>
    );
  }

  function buildPokemonCard() {
    return (
      <Row gutter={[16, 16]} justify="start">
        {pokemonData.map((pokemon) => (
          <Col key={pokemon.name} xs={24} sm={12} md={8} lg={8} xl={4}>
            <div
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: "8px",
                padding: "5px",
                textAlign: "center",
              }}
            >
              <Row>
              <Col span={10}>
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width="80px"
                  height="100px"
                />
              </Col>
              <Col span={13} style={{ textAlign: "left", alignContent: "center"}}>
                <h3>{pokemon.name}</h3>
                <Row gutter={[4, 4]} style={{ marginTop: "5px"}}>
                
                {pokemon.type.map((type) => (
                  <Col key={type} style={{ marginRight: "5px", border: "1px solid #e8e8e8", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                    <p>{type}</p>
                  </Col>
                ))}
                </Row>
              </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  console.log("pokemonData:", pokemonData);

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
        <Row
          justify="center"
          align="top"
          style={{ minHeight: "10vh", marginTop: "40px" }}
        >
          <Col lg={3} md={12} sm={24}>
            {buildStaticImages("/assets/images/image1.png", "Static Image 1")}
          </Col>
          <Col lg={13} md={12} sm={24}  style={{ textAlign: "center",  }}>
            <Row>
              <Col span={24}>{buildSearchBar()}</Col>
            </Row>
            <Row>
              <Col span={24}>{buildPokemonCard()}</Col>
            </Row>
          </Col>
          <Col lg={7} md={12} sm={24} style={{ textAlign: "center" }}>
            {buildStaticImages("/assets/images/image2.png", "Static Image 2")}
          </Col>
        </Row>
      </div>
    </>
  );
}
