import React, { useEffect } from "react";

// 1. Write a React component that displays a list of items from an array.
export const DisplayItemsFromList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

// 2.Implement a counter component that increments when a button is clicked.
export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// 3.Create a React component that fetches data from an API and displays it.
export const DataFetchingComponent = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("https://dummyjson.com/quotes/random")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <>
      <h1>{data.quote}</h1>
      <p>{data.author}</p>
    </>
  );
};

// 4.Write a React component that handles form submission and validation.
export const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      setIsSubmitted(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {isSubmitted && <p>Form submitted successfully!</p>}
    </>
  );
};

// 5. Implement a React component that displays a list of items with pagination.
export const PaginatedList = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h1>Paginated List</h1>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// 6. Create a React component that uses React Router for client-side routing.
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

export const Navbar = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

// 7. Write a React component that uses React Hooks to manage state.
export const CounterWithHooks = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const increment = () => setCount(count + 1);
  const handleNameChange = (event) => setName(event.target.value);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>

      <div>
        <h2>Enter Your Name:</h2>
        <input type="text" value={name} onChange={handleNameChange} />
        <p>Hello, {name}!</p>
      </div>
    </div>
  );
};

//8. Implement a React component that displays a chart using a library like Chart.js.
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  };

  return (
    <div>
      <h1>Bar Chart Example</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

// 9. Create a React component that handles authentication and authorization.
import { Navigate } from "react-router-dom";
export const AuthenticationPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ element }) =>
    isAuthenticated ? element : <Navigate to="/login" />;

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <h2>Login Page</h2>
                <button onClick={login}>Login</button>
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={
                  <div>
                    <h2>Dashboard</h2>
                    <button onClick={logout}>Logout</button>
                  </div>
                }
              />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

// 10. Write a React component that uses React Context for state management.
import { useContext, createContext } from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);

// 11.  Implement a React component that displays a list of items with infinite scrolling.
import InfiniteScroll from "react-infinite-scroll-component";
const fetchItems = async (page) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Array.from(
    { length: 10 },
    (_, index) => `Item ${page * 10 + index + 1}`
  );
};

export const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadMoreItems = async () => {
    const newItems = await fetchItems(page);
    setItems((prevItems) => [...prevItems, ...newItems]);
    if (newItems.length === 0) setHasMore(false);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMoreItems}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more items</p>}
    >
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

// 12. Create a React component that uses React Suspense for lazy loading.
import { Suspense, lazy } from "react";
const HeavyComponent = lazy(() => import("./HeavyComponent"));

export const LazyLoadingComponent = () => {
  return (
    <div>
      <h1>React Suspense Example</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
};

// 13. Write a React component that handles errors and exceptions.
export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    console.error("Error caught by useErrorHandler:", error);
    setError(error);
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};

// 14. Implement a React component that displays a list of items with filtering and sorting.
import { useMemo } from "react";
export const ItemList = () => {
  const [items] = useState([
    { id: 1, name: "Apple", category: "Fruit" },
    { id: 2, name: "Banana", category: "Fruit" },
    { id: 3, name: "Carrot", category: "Vegetable" },
    { id: 4, name: "Broccoli", category: "Vegetable" },
    { id: 5, name: "Chicken", category: "Meat" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name_asc");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const sortedItems = useMemo(() => {
    const compare = (a, b) => {
      if (sortOption === "name_asc") return a.name.localeCompare(b.name);
      if (sortOption === "name_desc") return b.name.localeCompare(a.name);
      return 0;
    };

    return [...filteredItems].sort(compare);
  }, [filteredItems, sortOption]);

  return (
    <div>
      <h1>Item List</h1>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
      </select>

      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 15. Create a React component that uses React Memo for performance optimization.
export const ExpensiveComponent = React.memo(({ count }) => {
  console.log("ExpensiveComponent rendered");
  const result = Array.from({ length: 1000000 }, (_, i) => i * count).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div>
      <h2>Expensive Component</h2>
      <p>Count: {count}</p>
      <p>Result: {result}</p>
    </div>
  );
});

// 16. Write a React component that implements a carousel.
import "./Carousel.css";
export const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevItem}>
        &#9664;
      </button>
      <div className="carousel-item">
        <img src={items[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <button className="carousel-button next" onClick={nextItem}>
        &#9654;
      </button>
    </div>
  );
};

// 17. Implement a React component that displays a list of items with drag-and-drop functionality.
//   Install react-dnd and react-dnd-html5-backend
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const DragItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "ITEM",
    item: { index },
  });

  return (
    <div
      ref={ref}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: "lightgray",
        borderRadius: "4px",
        cursor: "move",
      }}
    >
      {item}
    </div>
  );
};
export const DragNDrop = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index === undefined) return;
      const newIndex = items.indexOf(draggedItem.item);
      const updatedItems = [...items];
      const [movedItem] = updatedItems.splice(draggedItem.index, 1);
      updatedItems.splice(newIndex, 0, movedItem);
      setItems(updatedItems);
    },
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px" }}>
        <h1>Drag-and-Drop List</h1>
        <div
          ref={drop}
          style={{
            width: "300px",
            minHeight: "400px",
            border: "2px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {items.map((item, index) => (
            <DragItem
              key={index}
              item={item}
              index={index}
              moveItem={(newIndex) => {
                const updatedItems = [...items];
                const [movedItem] = updatedItems.splice(index, 1);
                updatedItems.splice(newIndex, 0, movedItem);
                setItems(updatedItems);
              }}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

// 18. Create a React component that uses React Ref for DOM manipulation.
import { useRef } from "react";
export const DOMusingRef = () => {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const scrollToElement = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1>React Ref Example</h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
      />
      <button onClick={focusInput}>Focus Input</button>

      <div
        style={{ height: "150px", margin: "20px 0", border: "1px solid black" }}
      >
        <p>Scroll down to see the element below.</p>
      </div>

      <div
        ref={scrollRef}
        style={{ height: "200px", backgroundColor: "#f0f0f0" }}
      >
        <h2>Scroll to This Element</h2>
      </div>

      <button onClick={scrollToElement}>Scroll to Element</button>
    </div>
  );
};

// 19. Write a React component that implements a tooltip.
import "./tooltip.css";
const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && <div className="tooltip-content">{text}</div>}
    </div>
  );
};

// 20. Implement a React component that displays a list of items with virtualization.
// Install react-window
import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }) => <div style={style}>Item {index + 1}</div>;

export const VirtualizedList = ({ itemCount }) => {
  return (
    <List height={500} itemCount={itemCount} itemSize={35} width={300}>
      {Row}
    </List>
  );
};
