import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ingredientCategories, ingredientsData, getCategoryColor } from './Ingredients'
import './App.css';
import './assets/interstate-13.ttf';

const IngredientConfigurator = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mixerIngredients, setMixerIngredients] = useState([]);
  const [isMixing, setIsMixing] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const filteredIngredients = selectedCategory === 'All' 
    ? Object.values(ingredientsData).flat()
    : ingredientsData[selectedCategory] || [];

  const addIngredient = (ingredient) => {
    if (!mixerIngredients.some(ing => ing.id === ingredient.id)) {
      setMixerIngredients([...mixerIngredients, ingredient]);
    }
  };

  const removeFromMixer = (id) => {
    setMixerIngredients(mixerIngredients.filter(ing => ing.id !== id));
  };

  const mixIngredients = async () => {
    setIsMixing(true);
    try {
      const response = await axios.post('http://localhost:5000/api/test/evaluate', {
        ingredients: mixerIngredients.map(ing => ing.name)
      });
      setEvaluationResult(response.data.evaluation);
    } catch (error) {
      console.error('Error fetching evaluation:', error);
    } finally {
      setIsMixing(false);
    }
  };

  const resetMixer = () => {
    setMixerIngredients([]);
    setEvaluationResult(null);
    setIsMixing(false);
  };

  return (
    <div className="configurator-container">
      <h1 className="title">Blendtek Mixer</h1>
      <div className="main-content">
        <div className="ingredient-list">
          <h2 className="section-title" style={{'fontFamily':'Paytone One'}}>Our Ingredient List</h2>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            {ingredientCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="ingredients-grid">
            <AnimatePresence>
              {filteredIngredients.map((ingredient) => (
                <motion.button
                  key={ingredient.id}
                  onClick={() => addIngredient(ingredient)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="ingredient-button"
                  style={{ backgroundColor: ingredient.color }}
                >
                  {ingredient.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="mixer-container">
          <div className="mixer">
            {!evaluationResult ? (
              mixerIngredients.length > 0 ? (
                <div className="mixer-ingredients">
                  <AnimatePresence>
                    {mixerIngredients.map((ingredient) => (
                      <motion.div 
                        key={ingredient.id} 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="mixer-ingredient"
                        style={{ backgroundColor: ingredient.color }}
                      >
                        <span>{ingredient.name}</span>
                        <button 
                          onClick={() => removeFromMixer(ingredient.id)}
                          className="remove-ingredient"
                        >
                          x
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="empty-mixer">
                  <h3>Add ingredients to start mixing!</h3>
                </div>
              )
            ) : (
              <EvaluationResult result={evaluationResult} />
            )}
          </div>
          <div className="action-buttons">
            <ActionButton
              onClick={mixIngredients}
              disabled={mixerIngredients.length < 2 || isMixing}
              color="#00BFFF"
            >
              {isMixing ? 'Mixing...' : 'Mix'}
            </ActionButton>
            <ActionButton
              onClick={resetMixer}
              color="#FF4500"
            >
              Reset
            </ActionButton>
          </div>
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        :root {
          --primary-bg: #000000;
          --secondary-bg: #1A1A1A;
          --tertiary-bg: #2A2A2A;
          --primary-text: #FFFFFF;
          --accent-color: #00BFFF;
        }
        
        .h1 .h2{
          font-family: 'Paytone One'
        }

        .configurator-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          color: var(--primary-text);
          font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;
          overflow: hidden;
          background-color: var(--primary-bg);
        }

        .title {
          font-size: 36px;
          font-family: 'Paytone One';
          font-style: 'italic';
          font-weight: bold;
          padding: 20px;
          text-align: center;
          letter-spacing: 2px;
          margin: 0;
          text-shadow: 0 0 10px var(--accent-color);
        }

        .main-content {
          display: flex;
          gap: 20px;
          flex: 1;
          padding: 0 20px 20px;
          overflow: hidden;
        }

        .ingredient-list, .mixer-container {
          width: 40%;
          background-color: var(--secondary-bg);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.1);
        }

        .mixer-container {
          width: 60%;
        }
        .section-title {
          font-size: 24px;
          font-family: 'Paytone One'
          font-weight: bold;
          text-align: center;
          letter-spacing: 1px;
        }

        .category-select {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          background-color: var(--tertiary-bg);
          color: var(--primary-text);
          border: 2px solid var(--primary-bg);
          border-radius: 10px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-select:hover {
          border-color: var(--accent-color);
        }

        .ingredients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          overflow-y: auto;
          flex: 1;
          padding: 10px;
        }

        .ingredient-button {
          padding: 10px;
          border: 3px solid var(--primary-bg);
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Poppins'
          font-size: 14px;
          transition: all 0.3s ease;
          color: var(--primary-bg);
        }

        .mixer {
          flex: 1;
          background: linear-gradient(45deg, #00BFFF, #FF1493, #00BFFF);
          background-size: 200% 200%;
          animation: gradientMove 10s ease infinite;
          border-radius: 20px;
          padding: 6px;
          position: relative;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .mixer::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          right: 6px;
          bottom: 6px;
          background-color: var(--secondary-bg);
          border-radius: 14px;
          z-index: 1;
        }

        .mixer-ingredients {
          position: relative;
          z-index: 2;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 10px;
          height: 100%;
          overflow-y: auto;
        }

        .mixer-ingredient {
          background-color: var(--tertiary-bg);
          border-radius: 10px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 100px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          color: var(--primary-bg);
        }

        .remove-ingredient {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: rgba(0,0,0,0.2);
          color: var(--primary-text);
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .remove-ingredient:hover {
          background-color: rgba(0,0,0,0.4);
        }

        .empty-mixer {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--primary-text);
          font-size: 24px;
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

const ActionButton = ({ onClick, disabled, color, children }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{
      padding: '15px 30px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#FFFFFF',
      backgroundColor: color,
      border: 'none',
      borderRadius: '50px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      boxShadow: `0 5px 15px ${color}40`,
      transition: 'all 0.3s ease',
    }}
  >
    {children}
  </motion.button>
);

const EvaluationResult = ({ result }) => (
  <div className="evaluation-result">
    <h3 className="product-name">{result.overallEvaluation.productName}</h3>
    <div className="result-grid">
      <InfoBox 
        title="Summary" 
        content={result.overallEvaluation.summary} 
        color="#FFA500"
        gridColumn="1 / 3"
      />
      <InfoScoreBox
        flavorScore={result.overallEvaluation.flavorScore}
        healthScore={result.overallEvaluation.healthScore}
      />
      <InfoBox 
        title="Use Cases" 
        content={result.useCases} 
        isList={true}
        color="#1E90FF"
      />
      <InfoBox 
        title="Suitable Diets" 
        content={result.suitableDiets} 
        isList={true}
        color="#FF4500"
      />
      <InfoBox 
        title="Health Benefits" 
        content={result.healthBenefits}
        isList={true}
        color="#00CED1"
      />
    </div>
    <style jsx>{`
      .evaluation-result {
        padding: 20px;
        position: relative;
        z-index: 2;
      }

      .product-name {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
        font-family: 'Paytone One';
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .result-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
      }
    `}</style>
  </div>
);

const InfoScoreBox = ({ flavorScore, healthScore }) => {
  return (
    <div className="info-score-box">
      <h4 className="box-title">Scores</h4>
      <div className="scores">
        <ScoreBox 
          label="Flavor" 
          score={flavorScore} 
          color="#FF1493"
        />
        <ScoreBox 
          label="Health" 
          score={healthScore} 
          color="#32CD32"
        />
      </div>
      <style jsx>{`
        .info-score-box {
          background-color: #2A2A2A;
          border-radius: 15px;
          padding: 15px;
          border: 4px solid #000000;
        }

        .box-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          margin-top: -4px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .scores {
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
};

const ScoreBox = ({ label, score, color }) => {
  return (
    <div style={{ 
      backgroundColor: color,
      borderRadius: '15px',
      border: `2px solid #000000`, 
      padding: '10px', 
      textAlign: 'center',
      width: '80px',
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#000000', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>{score.toFixed(1)}</div>
    </div>
  );
};

const InfoBox = ({ title, content, isList = false, color, gridColumn = 'auto' }) => {
  return (
    <div style={{ 
      backgroundColor: '#2A2A2A', 
      borderRadius: '15px', 
      padding: '15px',
      border: `4px solid #000000`,
      gridColumn: gridColumn,
    }}>
      <h4 style={{ 
        marginTop: '-4px',
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '10px', 
        color: color,
        letterSpacing: '1px'
      }}>{title}</h4>
      {isList ? (
        <ul style={{ paddingLeft: '20px', margin: 0, color: '#FFFFFF' }}>
          {Array.isArray(content) ? content.map((item, index) => (
            <li key={index} style={{ marginBottom: '5px', fontSize: '16px' }}>{item}</li>
          )) : <li style={{ fontSize: '16px' }}>{content}</li>}
        </ul>
      ) : (
        <p style={{ fontSize: '20px', margin: 0, color: '#FFFFFF', fontStyle:'italic' }}>{content}</p>
      )}
    </div>
  );
};

export default IngredientConfigurator;