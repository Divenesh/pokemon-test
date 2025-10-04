"use client";
import React from "react";
import {
  Carousel,
  Image,
  Row,
  Col,
  Button,
  Pagination,
  Spin,
  Input,
} from "antd";
import { fetchPokemonData, searchPokemon } from "../../api/PokemonData";
import { Pokemon } from "../../types/PokeTypes";

export default function Home() {
  const [pokemonData, setPokemonData] = React.useState<Pokemon[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");

  React.useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page: number) => {
    setLoading(true);
    const data = await fetchPokemonData(page);
    setPokemonData(data.Pokemon);
    setTotal(data.Total);
    setLoading(false);
  };

  function buildCarouselItems() {
    return (
      <Carousel autoplay>
        <div>
          <Image src="/assets/carousel/carousel1.webp" alt="Image 1" />
        </div>
        <div>
          <Image src="/assets/carousel/carousel2.webp" alt="Image 2" />
        </div>
        <div>
          <Image src="/assets/carousel/carousel3.webp" alt="Image 3" />
        </div>
      </Carousel>
    );
  }

  function handlePageChange(page: number) {
    fetchData(page);
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
        <Image preview={false} src={src} alt={alt} />
      </div>
    );
  }

  function buildSearchBar() {
    return (
      <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
        <Col span={21}>
          <Input
            style={{ width: "100%", height: "35px" }}
            type="text"
            placeholder="Pokemon Name ...."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchValue);
              }
            }}
            onClear={() => handleClear()}
            allowClear
          />
        </Col>
        <Col span={3} style={{ paddingLeft: "10px", textAlign: "left" }}>
          <Button
            onClick={() => handleSearch(searchValue)}
            style={{
              width: "100%",
              backgroundColor: "#ff8c00ff",
              color: "#fff",
            }}
          >
            Search
          </Button>
        </Col>
      </Row>
    );
  }

  function handleClear() {
    setSearchValue("");
    fetchData(1);
  }

  function handleSearch(name: string) {
    if (name.trim() === "") {
      fetchData(1);
      return;
    }

    const fetchSearchData = async () => {
      setLoading(true);
      const data = await searchPokemon(name);

      setPokemonData(data.Pokemon);
      setTotal(1);
      setLoading(false);
    };
    fetchSearchData();
  }

  function buildPokemonCard() {
    if (loading) {
      return <Spin size="large" style={{ margin: "20px" }} />;
    }

    if (pokemonData) {
      if (pokemonData[0]?.name === undefined) {
        return <h2 style={{ margin: "20px" }}>No Pokemon Found</h2>;
      }
    }

    return (
      <Row gutter={[16, 16]} justify="start">
        {pokemonData.map((pokemon) => (
          <Col key={pokemon.name} xs={24} sm={12} md={12} lg={8} xl={8}>
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
                    preview={false}
                  />
                </Col>
                <Col
                  span={13}
                  style={{ textAlign: "left", alignContent: "center" }}
                >
                  <h3>{pokemon.name}</h3>
                  <Row gutter={[4, 4]} style={{ marginTop: "5px" }}>
                    {pokemon.type.map((type) => (
                      <Col
                        key={type}
                        style={{
                          marginRight: "5px",
                          border: "1px solid #e8e8e8",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "4px",
                        }}
                      >
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

  return (
    <>
      <div style={{ margin: "20px" }}>
        <Row justify="center" align="top" style={{ minHeight: "6vh" }}>
          <Col
            lg={18}
            style={{
              textAlign: "center",
              overflow: "hidden",
              maxHeight: "390px",
            }}
          >
            <div>{buildCarouselItems()}</div>
          </Col>
          <Col lg={5} md={24} sm={24} style={{ marginLeft: "20px" }}>
            <div style={{ marginBottom: "20px", maxHeight: "190px" }}>
              {buildStaticBanner("/assets/banner/banner1.webp", "Banner 1")}
            </div>
            <div style={{ maxHeight: "190px", overflow: "hidden" }}>
              {buildStaticBanner("/assets/banner/banner2.webp", "Banner 2")}
            </div>
          </Col>
        </Row>
        <Row
          justify="center"
          align="top"
          style={{ minHeight: "10vh", marginTop: "40px" }}
        >
          <Col lg={5} md={24} sm={24} style={{ textAlign: "center" }}>
            {buildStaticImages("/assets/images/image1.webp", "Static Image 1")}
          </Col>
          <Col lg={13} md={24} sm={24} style={{ textAlign: "center" }}>
            <Row>
              <Col span={24}>{buildSearchBar()}</Col>
            </Row>
            <Row>
              <Col span={24}>
                {buildPokemonCard()}
                <Pagination
                  align="center"
                  defaultCurrent={1}
                  pageSize={12}
                  total={total}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  style={{ marginTop: "20px", textAlign: "center" }}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={5} md={24} sm={24} style={{ textAlign: "right" }}>
            {buildStaticImages("/assets/images/image2.webp", "Static Image 2")}
          </Col>
        </Row>
      </div>
    </>
  );
}
