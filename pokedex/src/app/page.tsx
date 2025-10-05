"use client";
import React from "react";
import {Carousel, Image, Row, Col, Button, Spin, Input,} from "antd";
import { fetchPokemonData, searchPokemon } from "../../api/PokemonData";
import { Pokemon } from "../../types/PokeTypes";

export default function Home() {
  const [pokemonData, setPokemonData] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const nextPage = React.useRef<number>(1);

  React.useEffect(() => {
    fetchData(nextPage.current);
  }, []);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const data = await fetchPokemonData(page);
      nextPage.current++;
      setPokemonData((prevData) => [...prevData, ...data.Pokemon]);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  };

  function buildCarouselItems() {
    return (
      <Carousel autoplay>
        <div>
          <Image src="/assets/carousel/carousel1.webp" alt="Image 1" style={{ width: '100%', height: '390px', objectFit: 'cover' }} />
        </div>
        <div>
          <Image src="/assets/carousel/carousel2.webp" alt="Image 2" style={{ width: '100%', height: '390px', objectFit: 'cover' }} />
        </div>
        <div>
          <Image src="/assets/carousel/carousel3.webp" alt="Image 3" style={{ width: '100%', height: '390px', objectFit: 'cover' }} />
        </div>
      </Carousel>
    );
  }

  function buildStaticBanner(src: string, alt: string) {
    return (
      <div style={{ width: '100%', height: '185px', overflow: 'hidden' }}>
        <Image 
          src={src} 
          alt={alt} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  function buildStaticImages(src: string, alt: string) {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Image 
          preview={false} 
          src={src} 
          alt={alt} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  function buildSearchBar() {
    return (
      <Row justify="center" align="middle" style={{ marginBottom: "20px" }} gutter={[8, 0]}>
        <Col span={18}>
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
        <Col span={6}>
          <Button
            onClick={() => handleSearch(searchValue)}
            style={{
              width: "100%",
              height: "35px",
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

  async function handleClear() {
    setSearchValue("");
    setPokemonData([]);
    nextPage.current = 1;
    try {
      await fetchData(nextPage.current);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  function handleSearch(name: string) {
    if (name.trim() === "") {
      handleClear();
      return;
    }

  const fetchSearchData = async () => {
    
    setLoading(true);
      try {
        const data = await searchPokemon(name);
        setPokemonData(data.Pokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchData();
  }

  function buildPokemonCard() {

    if (pokemonData && !loading) {
      if (pokemonData[0]?.name === undefined) {
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>No Pokemon Found</h2>
          </div>
        );
      }
    }

    return (
      <div style={{ width: "100%", scrollbarWidth: "none", maxHeight: "600px", overflowY: "auto", minHeight: "100px" }}>
      <Row gutter={[16, 16]} justify="start">
        {pokemonData.map((pokemon) => (
          <Col key={pokemon.name} xs={24} sm={12} md={12} lg={8}>
            <div
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
                height: "140px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Row style={{ width: '100%' }}>
                <Col span={10}>
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width="80px"
                    height="100px"
                    preview={false}
                    style={{ objectFit: 'cover' }}
                  />
                </Col>
                <Col
                  span={14}
                  style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "8px" }}
                >
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>{pokemon.name}</h3>
                  <Row gutter={[4, 4]}>
                    {pokemon.type.map((type) => (
                      <Col key={type}>
                        <span
                          style={{
                            padding: "2px 6px",
                            border: "1px solid #e8e8e8",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "4px",
                            fontSize: "12px",
                            display: "inline-block",
                            marginRight: "4px",
                            marginBottom: "4px"
                          }}
                        >
                          {type}
                        </span>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {loading && <Spin size="large" />}
        {!loading && !searchValue && pokemonData.length > 1 && (
          <Button onClick={() => fetchData(nextPage.current)} style={{ backgroundColor: "#ff8c00ff", color: "#fff", width: "80%" }}>
            Load More
          </Button>
        )}      
      </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "100%", margin: "0 auto" }}>
      <Row gutter={[20, 20]} align="top" style={{ marginBottom: "40px" }}>
        <Col lg={17} md={16} sm={24} xs={24}>
          <div style={{ 
            height: "390px", 
            overflow: "hidden", 
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            {buildCarouselItems()}
          </div>
        </Col>
        <Col lg={7} md={8} sm={24} xs={24}>
          <div style={{ height: "390px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flex: 1, borderRadius: "8px", overflow: "hidden"}}>
              {buildStaticBanner("/assets/banner/banner1.webp", "Banner 1")}
            </div>
            <div style={{ flex: 1, borderRadius: "8px", overflow: "hidden"}}>
              {buildStaticBanner("/assets/banner/banner2.webp", "Banner 2")}
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} align="top">
        <Col lg={5} md={6} sm={24} xs={24}>
          <div style={{ 
            height: "600px", 
            borderRadius: "8px", 
            overflow: "hidden"
          }}>
            {buildStaticImages("/assets/images/image1.webp", "Static Image 1")}
          </div>
        </Col>
        
        <Col lg={14} md={12} sm={24} xs={24}>
          <div style={{ minHeight: "600px" }}>
            <div style={{ marginBottom: "20px" }}>
              {buildSearchBar()}
            </div>

            <div style={{ marginBottom: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" , padding: "10px", backgroundColor: "#fff" }}>
              {buildPokemonCard()}
            </div>
          
          </div>
        </Col>
        <Col lg={5} md={6} sm={24} xs={24}>
          <div style={{ 
            height: "600px", 
            borderRadius: "8px", 
            overflow: "hidden",
          }}>
            {buildStaticImages("/assets/images/image2.webp", "Static Image 2")}
          </div>
        </Col>
      </Row>
    </div>
  );
}