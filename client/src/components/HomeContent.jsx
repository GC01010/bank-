import React from "react";
import IMAGES from "./Image";
import '../assets/styles/HomeContent.css'

export default function HomeContent() {
  return (
    <div className=" pt-2 row" >
      <div className=" col w-50 p-5 pt-5 pb-5 bg-light">
        <h2 className=" p-5 bg-light">Normal Distribution here</h2>
        <p className="p-5 pt-0 pb-0">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. Contrary to popular belief, Lorem
          Ipsum is not simply random text. It has roots in a piece of classical
          Latin literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32.
        </p>
      </div>
      <div className="col w-50 p-5 pt-5 pb-5 bg-light"> <img className="img-fluid" src={IMAGES.imgone} alt="image"  /> </div>
    </div>
  );
}