import React, { useEffect, useState } from "react";
import "./app.css";
import blank from './imgs/blank.png'
import blue from './imgs/blue-candy.png'
import green from './imgs/green-candy.png'
import orange from './imgs/orange-candy.png'
import purple from './imgs/purple-candy.png'
import red from './imgs/red-candy.png'
import yellow from './imgs/yellow-candy.png'

const width = 8;
const CandyColors = [blue, green, orange, purple, red ,yellow];
const App = () => {
  const [BordItems, setBordItems] = useState([]);
  const [DraggedItem ,setDraggedId] = useState(null);
  const [DroppedItem ,setDroppedId] = useState(null);
  const CreateBord = () => {
    const Items = [];
    for (let i = 0; i < width * width; i++) {
      let RandomColor = Math.floor(Math.random(0) * CandyColors.length);
      Items.push(CandyColors[RandomColor]);
    }
    setBordItems(Items);
  };
  const CheckColumOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const ColumnOfFour = [
        i,
        i + width,
        i + width + width,
        i + width + width + width,
      ];
      const decidedColor = BordItems[i];
      if (ColumnOfFour.every((Square) => BordItems[Square] === decidedColor)) {
        ColumnOfFour.forEach((item) => (BordItems[item] = blank));
      }
    }
  };
  const CheckColumOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const ColumnOfFour = [i, i + width, i + width + width];
      const decidedColor = BordItems[i];
      if (ColumnOfFour.every((Square) => BordItems[Square] === decidedColor)) {
        ColumnOfFour.forEach((item) => (BordItems[item] = blank));
      }
    }
  };
  const checkRowOfFour = () => {
    for (let i = 0; i <= 61; i++) {
      const RowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = BordItems[i];
      const checkOutPordColumOFThree = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];
      if (checkOutPordColumOFThree.includes(i)) continue;
      if (RowOfFour.every((Square) => BordItems[Square] === decidedColor)) {
        RowOfFour.forEach((Square) => (BordItems[Square] = blank));
      }
    }
  };
  const CheckRowOfThree = () => {
    for (let i = 0; i <= 61; i++) {
      const RowThree = [i, i + 1, i + 2];
      const decidedColor = BordItems[i];
      const checkOutPordColumOFThree = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];
      if (checkOutPordColumOFThree.includes(i)) continue;
      if (RowThree.every((Square) => BordItems[Square] === decidedColor)) {
        RowThree.forEach((item) => (BordItems[item] = blank));
      }
    }
  };
  const MoveBelow = () => {
      for (let i = 0; i <= 64; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i) ;
        if(isFirstRow && BordItems[i] === blank) {
            const RandomColor = Math.floor(Math.random(0) * CandyColors.length)
            BordItems[i] = CandyColors[RandomColor]
        }
      if (BordItems[i + width] === blank) {
        BordItems[i + width] = BordItems[i];
        BordItems[i] = blank;
      }
    }
  };
  const  DargStart = (e ) => {
    setDraggedId(e.target);
  }
  const  Drop = (e) => {
    setDroppedId(e.target)
  }
  const  DargEnd = (e) => {
   const DraggedID = parseInt(DraggedItem.getAttribute('data-id')) ;
   const DroppedId = parseInt(DroppedItem.getAttribute('data-id')) ;
  const AvailableItem = [DraggedID -1, DraggedID + width, DraggedID - width ,DraggedID+1]
    if(AvailableItem.includes(DroppedId)) {
      BordItems[DraggedID] = DroppedItem.getAttribute('alt')
      BordItems[DroppedId] = DraggedItem.getAttribute('alt')
    } 
  }
  useEffect(() => {
    CreateBord();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      CheckColumOfFour();
      CheckColumOfThree();
      checkRowOfFour();
      CheckRowOfThree();
      MoveBelow();
      setBordItems([...BordItems]);
    }, 100);
    return () => clearInterval(timer);
  }, [CheckRowOfThree, checkRowOfFour, CheckColumOfFour, CheckColumOfThree]);
  return (
    <div className="Container">
      <div className="MainBord">
        {BordItems.map((item, index) => (
          <img src={item}
            key={index}
            alt={item}
            draggable={true}
            onDragStart={ DargStart }
            data-id={index}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={Drop}
            onDragEnd={DargEnd}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
