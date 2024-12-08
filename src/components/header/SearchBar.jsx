import React, { useState, useEffect } from 'react';
import './searchbar.css';

function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);

  // Функция поиска текста в видимых элементах страницы
  const searchAndHighlight = (searchText) => {
    clearHighlights(); // Убираем предыдущие подсветки

    if (!searchText) {
      setMatches([]);
      return;
    }

    const body = document.querySelector('body');
    const textNodes = getTextNodes(body);
    const searchRegex = new RegExp(searchText, 'gi');
    const foundMatches = [];

    textNodes.forEach(({ node, parent }) => {
      const matchesInNode = [...node.matchAll(searchRegex)];
      if (matchesInNode.length) {
        matchesInNode.forEach((match) => {
          foundMatches.push({ text: match[0], node, index: match.index, parent });
        });
        highlightNode(node, parent, matchesInNode, searchRegex);
      }
    });

    setMatches(foundMatches);
  };

  // Извлечение всех текстовых узлов
  const getTextNodes = (node) => {
    const textNodes = [];
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;

    while ((currentNode = walker.nextNode())) {
      const parent = currentNode.parentNode;
      if (parent && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
        textNodes.push({ node: currentNode.nodeValue, parent });
      }
    }

    return textNodes;
  };

  // Подсветка текста в текстовом узле
  const highlightNode = (text, parent, matches, regex) => {
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    matches.forEach((match) => {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;

      if (lastIndex < startIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, startIndex)));
      }

      const highlightSpan = document.createElement('span');
      highlightSpan.className = 'highlight';
      highlightSpan.textContent = text.slice(startIndex, endIndex);
      fragment.appendChild(highlightSpan);

      lastIndex = endIndex;
    });

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, parent.firstChild);
  };

  // Очистка подсветки
  const clearHighlights = () => {
    document.querySelectorAll('.highlight').forEach((el) => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  };

  // Переход к элементу при клике по совпадению
  const scrollToMatch = (index) => {
    const match = matches[index];
    if (match && match.parent) {
      match.parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    return () => {
      clearHighlights(); // Удаляем подсветку при размонтировании
    };
  }, []);

  return (
    <div className="global-search">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchAndHighlight(e.target.value);
        }}
        className="search-input"
      />
      {query && matches.length > 0 && (
        <div className="search-results">
          <ul>
            {matches.map((match, index) => (
              <li key={index} onClick={() => scrollToMatch(index)} className="search-result-item">
                <strong></strong> {match.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      {query && matches.length === 0 && (
        <div className="search-status">No matches found</div>
      )}
    </div>
  );
}

export default GlobalSearch;
