import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function MoreImages() {
  return (
    <ImageList sx={{   }} cols={2}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://www.treehugger.com/thmb/Eu2036KeU3IG6I6Ewoz9tgyCEdI=/2000x1341/filters:fill(auto,1)/stacia-van-conversion-vanlife-conversions-uk-12-a6e6ac952af3437dba7a41ef61fdddb8.jpg",
    title: "Interior",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/57ef0117579fb34c2451c73b/1650314990928-CN1G4NG5C5RI719WDKAG/DSC_6833.jpg",
    title: "more image",
  },
  {
    img: "https://www.thewaywardhome.com/wp-content/uploads/2022/03/GTRV-NV200-camper-1024x683-1.jpeg",
    title: "more images",
  },
  {
    img: "https://cdn.carbuzz.com/gallery-images/840x560/640000/800/640889.jpg",
    title: "more images",
  },
];
