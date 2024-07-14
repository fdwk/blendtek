const ingredientCategories = [
    "Amino Acids",
    "Bakery Mixes",
    "Citrates",
    "Dairy Ingredients",
    "Emulsifiers",
    "Functional Ingredients",
    "Fats and Oils",
    "Gums & Hydrocolloids",
    "Proteins",
    "Salt",
    "Seeds & Spices",
    "Starches",
    "Sweeteners"
  ];
  
  const getCategoryColor = (category) => {
    const colorMap = {
      "Amino Acids": "#FFD700",          // Gold
      "Bakery Mixes": "#8B4513",         // Saddle Brown
      "Citrates": "#FFA07A",             // Light Salmon
      "Dairy Ingredients": "#FFFAF0",    // Floral White
      "Emulsifiers": "#98FB98",          // Pale Green
      "Functional Ingredients": "#DDA0DD", // Plum
      "Fats and Oils": "#F0E68C",        // Khaki
      "Gums & Hydrocolloids": "#B0E0E6", // Powder Blue
      "Proteins": "#CD853F",             // Peru
      "Salt": "#F5F5F5",                 // White Smoke
      "Seeds & Spices": "#FF6347",       // Tomato
      "Starches": "#FAFAD2",             // Light Goldenrod Yellow
      "Sweeteners": "#FFC0CB",           // Pink
    };
    return colorMap[category] || "#FFFFFF"; // Default to white if category not found
  };
  
  const ingredientsData = {
    "Amino Acids": [
      { id: "aa1", name: "Acetyl Cysteine", color: "#FFD700" },
      { id: "aa2", name: "Alanine", color: "#FFD700" },
      { id: "aa3", name: "Arginine", color: "#FFD700" },
      { id: "aa4", name: "BCAA", color: "#FFD700" },
      { id: "aa5", name: "Creatine", color: "#FFD700" },
      { id: "aa6", name: "Glutamine", color: "#FFD700" },
      { id: "aa7", name: "Glycine", color: "#FFD700" },
      { id: "aa8", name: "Leucine", color: "#FFD700" },
      { id: "aa9", name: "Theanine", color: "#FFD700" },
      { id: "aa10", name: "Valine", color: "#FFD700" }
    ],
    "Bakery Mixes": [
      { id: "bm1", name: "Bakery Concentrates", color: "#8B4513" },
      { id: "bm2", name: "Brownie Mix", color: "#8B4513" },
      { id: "bm3", name: "Chocolate Cake Mix", color: "#8B4513" },
      { id: "bm4", name: "Cookie Mix", color: "#8B4513" },
      { id: "bm5", name: "Crepe Mix", color: "#8B4513" },
      { id: "bm6", name: "Custom Mixes and Bases", color: "#8B4513" },
      { id: "bm7", name: "Donut Mix", color: "#8B4513" },
      { id: "bm8", name: "Pancake Mix", color: "#8B4513" },
      { id: "bm9", name: "Red Velvet Cake Mix", color: "#8B4513" },
      { id: "bm10", name: "Vanilla Cake Mix", color: "#8B4513" }
    ],
    "Citrates": [
      { id: "ct1", name: "Citric Acid", color: "#FFA07A" }
    ],
    "Dairy Ingredients": [
      { id: "di1", name: "Calcium Caseinate", color: "#FFFAF0" },
      { id: "di2", name: "Casein, Acid and Rennet", color: "#FFFAF0" },
      { id: "di3", name: "Sodium Caseinate", color: "#FFFAF0" },
      { id: "di4", name: "Whey Permeate", color: "#FFFAF0" },
      { id: "di5", name: "Whey Powder", color: "#FFFAF0" },
      { id: "di6", name: "Whey Protein Concentrate", color: "#FFFAF0" },
      { id: "di7", name: "Whey Protein Isolate", color: "#FFFAF0" }
    ],
    "Emulsifiers": [
      { id: "em1", name: "Ammonium Phosphatides", color: "#98FB98" },
      { id: "em2", name: "CSL (Calcium Stearoyl Lactylate)", color: "#98FB98" },
      { id: "em3", name: "CSL (Calcium stearoyl lactylate)", color: "#98FB98" },
      { id: "em4", name: "DATEM", color: "#98FB98" },
      { id: "em5", name: "Distilled Monoglycerides", color: "#98FB98" },
      { id: "em6", name: "Glycerol Monostearate", color: "#98FB98" },
      { id: "em7", name: "GMO (Glycerol monooleate)", color: "#98FB98" },
      { id: "em8", name: "Lecithin", color: "#98FB98" },
      { id: "em9", name: "Mono & Diglycerides", color: "#98FB98" },
      { id: "em10", name: "Polyglycerol Oleate", color: "#98FB98" },
      { id: "em11", name: "Polyglycerol Stearate", color: "#98FB98" },
      { id: "em12", name: "Polysorbate 60 & 80", color: "#98FB98" },
      { id: "em13", name: "Propylene Glycol Monostearate", color: "#98FB98" }
    ],
    "Functional Ingredients": [
      { id: "fi1", name: "Probiotics", color: "#DDA0DD" },
      { id: "fi2", name: "Postbiotics", color: "#DDA0DD" }
    ],
    "Fats and Oils": [
      { id: "fo1", name: "Canola Oil", color: "#F0E68C" },
      { id: "fo2", name: "Coconut Oil", color: "#F0E68C" },
      { id: "fo3", name: "Palm Oil", color: "#F0E68C" },
      { id: "fo4", name: "Palm Kernel", color: "#F0E68C" },
      { id: "fo5", name: "Shortening", color: "#F0E68C" },
      { id: "fo6", name: "Soybean", color: "#F0E68C" },
      { id: "fo7", name: "Sunflower Oil", color: "#F0E68C" }
    ],
    "Gums & Hydrocolloids": [
      { id: "gh1", name: "Cellulose Gum", color: "#B0E0E6" },
      { id: "gh2", name: "Guar", color: "#B0E0E6" },
      { id: "gh3", name: "Locust Bean", color: "#B0E0E6" },
      { id: "gh4", name: "Pectin", color: "#B0E0E6" },
      { id: "gh5", name: "Xantha", color: "#B0E0E6" }
    ],
    "Proteins": [
      { id: "pr1", name: "Faba Protein", color: "#CD853F" },
      { id: "pr2", name: "Lentil Protein", color: "#CD853F" },
      { id: "pr3", name: "Mung Protein", color: "#CD853F" },
      { id: "pr4", name: "Pea Protein", color: "#CD853F" },
      { id: "pr5", name: "Soy Flour and Soy Grits", color: "#CD853F" },
      { id: "pr6", name: "Soy Ingredients (organic and gluten-free)", color: "#CD853F" },
      { id: "pr7", name: "Soy Protein Concentrate", color: "#CD853F" },
      { id: "pr8", name: "Textured Soy Protein", color: "#CD853F" },
      { id: "pr9", name: "Textured Vegetable Protein", color: "#CD853F" }
    ],
    "Salt": [
      { id: "st1", name: "Fine Salt", color: "#F5F5F5" },
      { id: "st2", name: "Iodized Salt", color: "#F5F5F5" },
      { id: "st3", name: "Sea Salt", color: "#F5F5F5" }
    ],
    "Seeds & Spices": [
      { id: "ss1", name: "Allspice", color: "#FF6347" },
      { id: "ss2", name: "Cardamom", color: "#FF6347" },
      { id: "ss3", name: "Cinnamon", color: "#FF6347" },
      { id: "ss4", name: "Flax Seeds", color: "#FF6347" },
      { id: "ss5", name: "Garlic", color: "#FF6347" },
      { id: "ss6", name: "Ginger", color: "#FF6347" },
      { id: "ss7", name: "Herbs", color: "#FF6347" },
      { id: "ss8", name: "Oleoresins", color: "#FF6347" },
      { id: "ss9", name: "Onion", color: "#FF6347" },
      { id: "ss10", name: "Paprika", color: "#FF6347" },
      { id: "ss11", name: "Pepper", color: "#FF6347" },
      { id: "ss12", name: "Sunflower Seeds", color: "#FF6347" }
    ],
    "Starches": [
      { id: "sr1", name: "Corn Starch", color: "#FAFAD2" },
      { id: "sr2", name: "Rice Starch", color: "#FAFAD2" },
      { id: "sr3", name: "Tapioca Starch", color: "#FAFAD2" },
      { id: "sr4", name: "Wheat Starch", color: "#FAFAD2" }
    ],
    "Sweeteners": [
      { id: "sw1", name: "Dextrose", color: "#FFC0CB" },
      { id: "sw2", name: "Erythritol", color: "#FFC0CB" },
      { id: "sw3", name: "Honey", color: "#FFC0CB" },
      { id: "sw4", name: "Isomalt", color: "#FFC0CB" },
      { id: "sw5", name: "Rice Syrup", color: "#FFC0CB" },
      { id: "sw6", name: "Sorbitol", color: "#FFC0CB" },
      { id: "sw7", name: "Stevia", color: "#FFC0CB" },
      { id: "sw8", name: "Sucrose", color: "#FFC0CB" },
      { id: "sw9", name: "Tapioca Syrup", color: "#FFC0CB" }
    ]
  };
  
  export { ingredientCategories, ingredientsData, getCategoryColor };