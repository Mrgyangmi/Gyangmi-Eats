const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + "/frontend"));
 
// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "Gyangmi Eats API",
    time: new Date().toISOString()
  });
});


// =====================================================
// MENU PAGE
// =====================================================

app.get("/menu.html", (req, res) => {
  res.sendFile(__dirname + "/frontend/menu.html");
});


// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});


// =====================================================
// USERS
// =====================================================

// Get all users
app.get("/users", (req, res) => {
  db.query(
    "SELECT * FROM Users",
    (err, results) => {
      if (err) {
        console.log("User query failed:", err);

        return res
          .status(500)
          .send("Database query failed");
      }

      res.json(results);
    }
  );
});


// Register user
app.post("/users", (req, res) => {
  const {
    name,
    email,
    password,
    phone
  } = req.body;

  const sql =
    "INSERT INTO Users (name, email, password, phone) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      name,
      email,
      password,
      phone
    ],
    (err, result) => {
      if (err) {
        console.log("User insert failed:", err);

        return res
          .status(500)
          .send("User registration failed");
      }

      res.send(
        "User registered successfully!"
      );
    }
  );
});


// =====================================================
// LOGIN
// =====================================================

app.post("/login", (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send("Email and password are required");
  }

  const sql =
    "SELECT id, name, email, phone FROM Users WHERE email = ? AND password = ?";

  db.query(
    sql,
    [
      email,
      password
    ],
    (err, results) => {
      if (err) {
        console.log("Login failed:", err);

        return res
          .status(500)
          .send("Login failed");
      }

      if (results.length === 0) {
        return res
          .status(401)
          .send("Invalid email or password");
      }

      res.status(200).json({
        message: "Login successful",
        user: results[0]
      });
    }
  );
});


// =====================================================
// RESTAURANTS
// =====================================================

// Get all restaurants
app.get("/restaurants", (req, res) => {
  db.query(
    "SELECT * FROM Restaurants",
    (err, results) => {
      if (err) {
        console.log(
          "Restaurant query failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Restaurant query failed: " +
            err.message
          );
      }

      res.json(results);
    }
  );
});


// Add new restaurant
app.post("/restaurants", (req, res) => {
  const {
    name,
    description,
    phone,
    owner_id
  } = req.body;

  const sql =
    "INSERT INTO Restaurants (name, description, phone, owner_id) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      name,
      description,
      phone,
      owner_id
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Restaurant insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Restaurant registration failed"
          );
      }

      res.send(
        "Restaurant added successfully!"
      );
    }
  );
});


// =====================================================
// RESTAURANT CATEGORIES
// =====================================================

// Get restaurant categories
app.get(
  "/restaurant-categories",
  (req, res) => {
    db.query(
      "SELECT * FROM RestaurantCategories",
      (err, results) => {
        if (err) {
          console.log(
            "Category query failed:",
            err
          );

          return res
            .status(500)
            .send("Category query failed");
        }

        res.json(results);
      }
    );
  }
);


// Add restaurant category
app.post(
  "/restaurant-categories",
  (req, res) => {
    const {
      restaurant_id,
      name
    } = req.body;

    const sql =
      "INSERT INTO RestaurantCategories (restaurant_id, name) VALUES (?, ?)";

    db.query(
      sql,
      [
        restaurant_id,
        name
      ],
      (err, result) => {
        if (err) {
          console.log(
            "Category insert failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Category registration failed"
            );
        }

        res.send(
          "Restaurant category added successfully!"
        );
      }
    );
  }
);


// =====================================================
// MENUS
// =====================================================

// Get all menus
app.get("/menus", (req, res) => {
  db.query(
    "SELECT * FROM Menus",
    (err, results) => {
      if (err) {
        console.log(
          "Menu query failed:",
          err
        );

        return res
          .status(500)
          .send("Menu query failed");
      }

      res.json(results);
    }
  );
});


// Add new menu
app.post("/menus", (req, res) => {
  const {
    restaurant_id,
    name,
    description,
    price,
    category_id
  } = req.body;

  const sql =
    "INSERT INTO Menus (restaurant_id, name, description, price, category_id) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      restaurant_id,
      name,
      description,
      price,
      category_id
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Menu insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Menu registration failed"
          );
      }

      res.send(
        "Menu added successfully!"
      );
    }
  );
});


// =====================================================
// ADDRESSES
// =====================================================

// Get all addresses
app.get("/addresses", (req, res) => {
  db.query(
    "SELECT * FROM Addresses",
    (err, results) => {
      if (err) {
        console.log(
          "Address query failed:",
          err
        );

        return res
          .status(500)
          .send("Address query failed");
      }

      res.json(results);
    }
  );
});


// Add new address
app.post("/addresses", (req, res) => {
  const {
    user_id,
    address,
    city,
    postal_code,
    phone
  } = req.body;

  const sql =
    "INSERT INTO Addresses (user_id, address, city, postal_code, phone) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      user_id,
      address,
      city,
      postal_code || null,
      phone || null
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Address insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Address creation failed"
          );
      }

      res.status(201).json({
        success: true,
        message: "Address added successfully!",
        id: result.insertId
      });
    }
  );
});



// =====================================================
// FOODS
// =====================================================

// Get all foods
app.get("/foods", (req, res) => {
  db.query(
    "SELECT * FROM Foods",
    (err, results) => {
      if (err) {
        console.log(
          "Food query failed:",
          err
        );

        return res
          .status(500)
          .send("Food query failed");
      }

      res.json(results);
    }
  );
});


// Add new food
app.post("/foods", (req, res) => {
  const {
    restaurant_id,
    name,
    description,
    price,
    category_id
  } = req.body;

  const sql =
    "INSERT INTO Foods (restaurant_id, name, description, price, category_id) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      restaurant_id,
      name,
      description,
      price,
      category_id
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Food insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Food creation failed"
          );
      }

      res.send(
        "Food added successfully!"
      );
    }
  );
});


// =====================================================
// FOOD CATEGORIES
// =====================================================

// Get all food categories
app.get(
  "/food-categories",
  (req, res) => {
    db.query(
      "SELECT * FROM FoodCategories",
      (err, results) => {
        if (err) {
          console.log(
            "Food category query failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Food category query failed"
            );
        }

        res.json(results);
      }
    );
  }
);


// Add food category
app.post(
  "/food-categories",
  (req, res) => {
    const {
      restaurant_id,
      name
    } = req.body;

    const sql =
      "INSERT INTO FoodCategories (restaurant_id, name) VALUES (?, ?)";

    db.query(
      sql,
      [
        restaurant_id,
        name
      ],
      (err, result) => {
        if (err) {
          console.log(
            "Food category insert failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Food category creation failed"
            );
        }

        res.send(
          "Food category added successfully!"
        );
      }
    );
  }
);


// =====================================================
// CART
// =====================================================

// Get all carts
app.get("/cart", (req, res) => {
  db.query(
    "SELECT * FROM Cart",
    (err, results) => {
      if (err) {
        console.log(
          "Cart query failed:",
          err
        );

        return res
          .status(500)
          .send("Cart query failed");
      }

      res.json(results);
    }
  );
});


// Create cart
app.post("/cart", (req, res) => {
  const {
    user_id
  } = req.body;

  const sql =
    "INSERT INTO Cart (user_id) VALUES (?)";

  db.query(
    sql,
    [user_id],
    (err, result) => {
      if (err) {
        console.log(
          "Cart insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Cart creation failed"
          );
      }

      res.send(
        "Cart created successfully!"
      );
    }
  );
});


// =====================================================
// CART ITEMS
// =====================================================

// Get all cart items
app.get("/cart-items", (req, res) => {
  db.query(
    "SELECT * FROM CartItems",
    (err, results) => {
      if (err) {
        console.log(
          "Cart item query failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Cart item query failed"
          );
      }

      res.json(results);
    }
  );
});


// Add item to cart
app.post("/cart-items", (req, res) => {
  const {
    cart_id,
    menu_id,
    quantity,
    price
  } = req.body;

  const sql =
    "INSERT INTO CartItems (cart_id, menu_id, quantity, price) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      cart_id,
      menu_id,
      quantity,
      price
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Cart item insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Cart item creation failed"
          );
      }

      res.send(
        "Cart item added successfully!"
      );
    }
  );
});


// =====================================================
// ORDERS
// =====================================================

// Get all orders
app.get("/orders", (req, res) => {
  db.query(
    "SELECT * FROM Orders",
    (err, results) => {
      if (err) {
        console.log(
          "Order query failed:",
          err
        );

        return res
          .status(500)
          .send("Order query failed");
      }

      res.json(results);
    }
  );
});


// Get single order
app.get("/orders/:id", (req, res) => {
  const orderId =
    req.params.id;

  db.query(
    "SELECT * FROM Orders WHERE id = ?",
    [orderId],
    (err, results) => {
      if (err) {
        console.log(
          "Single order query failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Order query failed"
          );
      }

      if (results.length === 0) {
        return res
          .status(404)
          .send(
            "Order not found"
          );
      }

      res.json(results[0]);
    }
  );
});


// Create new order
app.post("/orders", (req, res) => {
  const { user_id, restaurant_id, total_amount, status } = req.body;
  const userId = Number(user_id);
  const restaurantId = Number(restaurant_id);
  const total = Number(total_amount);
  const orderStatus = status || "Pending";

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ success: false, message: "Valid user_id is required" });
  }
  if (!Number.isInteger(restaurantId) || restaurantId <= 0) {
    return res.status(400).json({ success: false, message: "Valid restaurant_id is required" });
  }
  if (!Number.isFinite(total) || total < 0) {
    return res.status(400).json({ success: false, message: "Valid total_amount is required" });
  }

  const sql = "INSERT INTO Orders (user_id, restaurant_id, total_amount, status) VALUES (?, ?, ?, ?)";

  db.query(sql, [userId, restaurantId, total, orderStatus], (err, result) => {
    if (err) {
      console.log("Order insert failed:", err);
      return res.status(500).json({ success: false, message: "Order creation failed" });
    }

    const orderId = result.insertId;

    // Create the delivery record automatically. Admin can assign a driver later.
    db.query(
      "INSERT INTO Deliveries (order_id, driver_id, status) VALUES (?, NULL, ?)",
      [orderId, "Assigned"],
      (deliveryErr, deliveryResult) => {
        if (deliveryErr) {
          console.error("Delivery creation failed:", deliveryErr);
          return res.status(201).json({
            success: true,
            message: "Order created, but delivery record could not be created.",
            id: orderId,
            order_id: orderId,
            delivery_id: null,
            delivery_created: false
          });
        }

        res.status(201).json({
          success: true,
          message: "Order created successfully!",
          id: orderId,
          order_id: orderId,
          delivery_id: deliveryResult.insertId,
          delivery_created: true
        });
      }
    );
  });
});


// =====================================================
// ORDER ITEMS
// =====================================================

// Get all order items
app.get("/order-items", (req, res) => {
  db.query(
    "SELECT * FROM OrderItems",
    (err, results) => {
      if (err) {
        console.log(
          "Order item query failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Order item query failed"
          );
      }

      res.json(results);
    }
  );
});


// Get order items by order ID
app.get(
  "/order-items/:order_id",
  (req, res) => {
    const orderId =
      req.params.order_id;

    db.query(
      "SELECT * FROM OrderItems WHERE order_id = ?",
      [orderId],
      (err, results) => {
        if (err) {
          console.log(
            "Order items query failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Order items query failed"
            );
        }

        res.json(results);
      }
    );
  }
);


// Add order item
app.post("/order-items", (req, res) => {
  const {
    order_id,
    menu_id,
    quantity,
    price
  } = req.body;

  const sql =
    "INSERT INTO OrderItems (order_id, menu_id, quantity, price) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      order_id,
      menu_id,
      quantity,
      price
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Order item insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Order item creation failed"
          );
      }

      res.status(201).json({
        success: true,
        message: "Order item added successfully!",
        id: result.insertId
      });
    }
  );
});


// =====================================================
// PAYMENTS
// =====================================================

// Get all payments
app.get("/payments", (req, res) => {
  db.query(
    "SELECT * FROM Payments",
    (err, results) => {
      if (err) {
        console.log(
          "Payment query failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Payment query failed"
          );
      }

      res.json(results);
    }
  );
});


// Get payment by order ID
app.get(
  "/payments/:order_id",
  (req, res) => {
    const orderId =
      req.params.order_id;

    db.query(
      "SELECT * FROM Payments WHERE order_id = ?",
      [orderId],
      (err, results) => {
        if (err) {
          console.log(
            "Payment query failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Payment query failed"
            );
        }

        res.json(results);
      }
    );
  }
);


// Create payment
app.post("/payments", (req, res) => {
  const {
    order_id,
    amount,
    method,
    status,
    paid_at
  } = req.body;

  const sql =
    "INSERT INTO Payments (order_id, amount, method, status, paid_at) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      order_id,
      amount,
      method,
      status || "Pending",
      paid_at || null
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Payment insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Payment creation failed"
          );
      }

      res.status(201).json({
        success: true,
        message: "Payment added successfully!",
        id: result.insertId
      });
    }
  );
});


// =====================================================
// REVIEWS
// =====================================================

// Get all reviews
app.get("/reviews", (req, res) => {
  db.query(
    "SELECT * FROM Reviews",
    (err, results) => {
      if (err) {
        console.log(
          "Review query failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Review query failed"
          );
      }

      res.json(results);
    }
  );
});


// Add review
app.post("/reviews", (req, res) => {
  const {
    user_id,
    restaurant_id,
    rating,
    comment
  } = req.body;

  const sql =
    "INSERT INTO Reviews (user_id, restaurant_id, rating, comment) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      user_id,
      restaurant_id,
      rating,
      comment
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Review insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Review creation failed"
          );
      }

      res.send(
        "Review added successfully!"
      );
    }
  );
});


// =====================================================
// DELIVERY DRIVERS
// =====================================================

// Get all delivery drivers
app.get(
  "/delivery-drivers",
  (req, res) => {
    db.query(
      "SELECT * FROM DeliveryDrivers",
      (err, results) => {
        if (err) {
          console.log(
            "Driver query failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Driver query failed"
            );
        }

        res.json(results);
      }
    );
  }
);


// Add delivery driver
app.post(
  "/delivery-drivers",
  (req, res) => {
    const {
      name,
      phone,
      vehicle_type,
      vehicle_number,
      status
    } = req.body;

    const sql =
      "INSERT INTO DeliveryDrivers (name, phone, vehicle_type, vehicle_number, status) VALUES (?, ?, ?, ?, ?)";

    db.query(
      sql,
      [
        name,
        phone,
        vehicle_type,
        vehicle_number,
        status || "Available"
      ],
      (err, result) => {
        if (err) {
          console.log(
            "Driver insert failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Driver creation failed"
            );
        }

        res.send(
          "Delivery driver added successfully!"
        );
      }
    );
  }
);


// =====================================================
// DELIVERIES
// =====================================================

// Get all deliveries
app.get(
  "/deliveries",
  (req, res) => {
    db.query(
      "SELECT * FROM Deliveries",
      (err, results) => {
        if (err) {
          console.log(
            "Delivery query failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Delivery query failed"
            );
        }

        res.json(results);
      }
    );
  }
);


// Create delivery
app.post(
  "/deliveries",
  (req, res) => {
    const {
      order_id,
      driver_id,
      status,
      pickup_time,
      delivery_time
    } = req.body;

    const sql =
      "INSERT INTO Deliveries (order_id, driver_id, status, pickup_time, delivery_time) VALUES (?, ?, ?, ?, ?)";

    db.query(
      sql,
      [
        order_id,
        driver_id,
        status || "Assigned",
        pickup_time || null,
        delivery_time || null
      ],
      (err, result) => {
        if (err) {
          console.log(
            "Delivery insert failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Delivery creation failed"
            );
        }

        res.json({
          message:
            "Delivery added successfully!",
          delivery_id:
            result.insertId
        });
      }
    );
  }
);


// =====================================================
// COUPONS
// =====================================================

// Get all coupons
app.get("/coupons", (req, res) => {
  db.query(
    "SELECT * FROM Coupons",
    (err, results) => {
      if (err) {
        console.log(
          "Coupon query failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Coupon query failed"
          );
      }

      res.json(results);
    }
  );
});


// Create coupon
app.post("/coupons", (req, res) => {
  const {
    code,
    discount_type,
    discount_value,
    min_order_amount,
    expiry_date
  } = req.body;

  const sql =
    "INSERT INTO Coupons (code, discount_type, discount_value, min_order_amount, expiry_date) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      code,
      discount_type,
      discount_value,
      min_order_amount,
      expiry_date
    ],
    (err, result) => {
      if (err) {
        console.log(
          "Coupon insert failed:",
          err
        );

        return res
          .status(500)
          .send(
            "Coupon creation failed"
          );
      }

      res.send(
        "Coupon created successfully!"
      );
    }
  );
});


// =====================================================
// FAVORITES
// =====================================================

// Get all favorites
app.get(
  "/favorites",
  (req, res) => {
    db.query(
      "SELECT * FROM Favorites",
      (err, results) => {
        if (err) {
          console.log(
            "Favorite query failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Favorite query failed"
            );
        }

        res.json(results);
      }
    );
  }
);


// Add favorite
app.post(
  "/favorites",
  (req, res) => {
    const userId = Number(req.body.user_id);
    const restaurantId = Number(req.body.restaurant_id);

    if (!Number.isInteger(userId) || userId <= 0 ||
        !Number.isInteger(restaurantId) || restaurantId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid user_id and restaurant_id are required"
      });
    }

    db.query(
      "SELECT id FROM Favorites WHERE user_id = ? AND restaurant_id = ?",
      [userId, restaurantId],
      (checkErr, rows) => {
        if (checkErr) {
          return res.status(500).json({
            success: false,
            message: "Favorite lookup failed"
          });
        }

        if (rows.length > 0) {
          return res.status(200).json({
            success: true,
            message: "Restaurant is already in favorites.",
            id: rows[0].id,
            already_exists: true
          });
        }

        db.query(
          "INSERT INTO Favorites (user_id, restaurant_id) VALUES (?, ?)",
          [userId, restaurantId],
          (err, result) => {
            if (err) {
              console.log("Favorite insert failed:", err);
              return res.status(500).json({
                success: false,
                message: "Favorite creation failed"
              });
            }

            res.status(201).json({
              success: true,
              message: "Favorite added successfully!",
              id: result.insertId
            });
          }
        );
      }
    );
  }
);


// =====================================================
// DELETE FAVORITE
// =====================================================

app.delete(
  "/favorites/:id",
  (req, res) => {
    const id =
      req.params.id;

    db.query(
      "DELETE FROM Favorites WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(
            "Favorite delete failed:",
            err
          );

          return res
            .status(500)
            .send(
              "Failed to remove favorite."
            );
        }

        if (
          result.affectedRows === 0
        ) {
          return res
            .status(404)
            .send(
              "Favorite not found."
            );
        }

        console.log(
          `Favorite #${id} removed successfully`
        );

        res.send(
          "Favorite removed successfully."
        );
      }
    );
  }
);


// =====================================================
// UPDATE ORDER STATUS
// =====================================================

app.patch(
  "/orders/:id/status",
  (req, res) => {

    const orderId =
      req.params.id;

    const {
      status
    } = req.body;

    console.log(
      "ORDER STATUS UPDATE"
    );

    console.log(
      "Order ID:",
      orderId
    );

    console.log(
      "New Status:",
      status
    );


    if (!status) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Status is required"
        });
    }


    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];


    if (
      !allowedStatuses.includes(status)
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid order status"
        });
    }


    db.query(
      "SELECT id FROM Orders WHERE id = ?",
      [orderId],
      (err, rows) => {

        if (err) {
          console.log(
            "Order lookup failed:",
            err
          );

          return res
            .status(500)
            .json({
              success: false,
              message:
                "Order lookup failed"
            });
        }


        if (rows.length === 0) {
          return res
            .status(404)
            .json({
              success: false,
              message:
                "Order not found"
            });
        }


        db.query(
          "UPDATE Orders SET status = ? WHERE id = ?",
          [
            status,
            orderId
          ],
          (err, result) => {

            if (err) {
              console.log(
                "Order status update failed:",
                err
              );

              return res
                .status(500)
                .json({
                  success: false,
                  message:
                    "Order status update failed"
                });
            }


            console.log(
              `Order #${orderId} updated to ${status}`
            );


            res.json({
              success: true,
              message:
                "Order status updated successfully!",
              order_id:
                Number(orderId),
              status:
                status
            });

          }
        );

      }
    );

  }
);


// =====================================================
// UPDATE DELIVERY DRIVER
// =====================================================

app.patch(
  "/deliveries/:id/driver",
  (req, res) => {

    const deliveryId =
      req.params.id;

    const {
      driver_id
    } = req.body;


    console.log(
      "DELIVERY DRIVER UPDATE"
    );

    console.log(
      "Delivery ID:",
      deliveryId
    );

    console.log(
      "Driver ID:",
      driver_id
    );


    if (
      driver_id === undefined ||
      driver_id === null ||
      driver_id === ""
    ) {

      return res
        .status(400)
        .json({
          success: false,
          message:
            "Driver ID is required"
        });
    }


    const numericDriverId =
      Number(driver_id);


    if (
      !Number.isInteger(numericDriverId) ||
      numericDriverId <= 0
    ) {

      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid Driver ID"
        });
    }


    // Check driver exists
    db.query(
      "SELECT id FROM DeliveryDrivers WHERE id = ?",
      [numericDriverId],
      (err, drivers) => {

        if (err) {

          console.error(
            "Driver lookup failed:",
            err
          );

          return res
            .status(500)
            .json({
              success: false,
              message:
                "Driver lookup failed"
            });
        }


        if (
          drivers.length === 0
        ) {

          return res
            .status(404)
            .json({
              success: false,
              message:
                "Driver not found"
            });
        }


        // Check delivery exists
        db.query(
          "SELECT id FROM Deliveries WHERE id = ?",
          [deliveryId],
          (err, deliveries) => {

            if (err) {

              console.error(
                "Delivery lookup failed:",
                err
              );

              return res
                .status(500)
                .json({
                  success: false,
                  message:
                    "Delivery lookup failed"
                });
            }


            if (
              deliveries.length === 0
            ) {

              return res
                .status(404)
                .json({
                  success: false,
                  message:
                    "Delivery not found"
                });
            }


            // Assign driver
            db.query(
              "SELECT driver_id FROM Deliveries WHERE id = ?",
              [deliveryId],
              (oldErr, oldRows) => {
                if (oldErr) {
                  return res.status(500).json({
                    success: false,
                    message: "Existing driver lookup failed"
                  });
                }

                const oldDriverId = oldRows[0]?.driver_id || null;

                db.query(
                  "UPDATE Deliveries SET driver_id = ? WHERE id = ?",
                  [numericDriverId, deliveryId],
                  (updateErr) => {
                    if (updateErr) {
                      return res.status(500).json({
                        success: false,
                        message: "Driver assignment failed"
                      });
                    }

                    db.query(
                      "UPDATE DeliveryDrivers SET status = 'Busy' WHERE id = ?",
                      [numericDriverId],
                      (busyErr) => {
                        if (busyErr) {
                          console.error("Driver busy-status update failed:", busyErr);
                        }

                        const releaseOldDriver = () => {
                          if (!oldDriverId || Number(oldDriverId) === numericDriverId) {
                            return sendSuccess();
                          }

                          db.query(
                            "UPDATE DeliveryDrivers SET status = 'Available' WHERE id = ?",
                            [oldDriverId],
                            () => sendSuccess()
                          );
                        };

                        const sendSuccess = () => {
                          console.log(`Driver #${numericDriverId} assigned to Delivery #${deliveryId}`);
                          res.json({
                            success: true,
                            message: "Driver assigned successfully!",
                            delivery_id: Number(deliveryId),
                            driver_id: numericDriverId
                          });
                        };

                        releaseOldDriver();
                      }
                    );
                  }
                );
              }
            );

          }
        );

      }
    );

  }
);


// =====================================================
// UPDATE DELIVERY STATUS
// DELIVERY → ORDER STATUS SYNC
// =====================================================

app.patch(
  "/deliveries/:id/status",
  (req, res) => {

    const deliveryId =
      req.params.id;

    const {
      status
    } = req.body;


    console.log(
      "================================="
    );

    console.log(
      "DELIVERY STATUS UPDATE"
    );

    console.log(
      "Delivery ID:",
      deliveryId
    );

    console.log(
      "New Status:",
      status
    );

    console.log(
      "================================="
    );


    // -------------------------------------------------
    // Allowed delivery statuses
    // -------------------------------------------------

    const allowedStatuses = [
      "Assigned",
      "Picked Up",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];


    if (!status) {

      return res
        .status(400)
        .json({
          success: false,
          message:
            "Status is required"
        });
    }


    if (
      !allowedStatuses.includes(status)
    ) {

      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid delivery status"
        });
    }


    // -------------------------------------------------
    // Find delivery + connected order
    // -------------------------------------------------

    db.query(
      "SELECT id, order_id, status, pickup_time, delivery_time FROM Deliveries WHERE id = ?",
      [deliveryId],
      (err, deliveryRows) => {

        if (err) {

          console.error(
            "Delivery lookup failed:",
            err
          );

          return res
            .status(500)
            .json({
              success: false,
              message:
                "Failed to find delivery"
            });
        }


        if (
          deliveryRows.length === 0
        ) {

          return res
            .status(404)
            .json({
              success: false,
              message:
                "Delivery not found"
            });
        }


        const delivery =
          deliveryRows[0];

        const orderId =
          delivery.order_id;


        // -------------------------------------------------
        // Convert delivery status → order status
        // -------------------------------------------------

        let orderStatus = null;


        if (
          status === "Assigned"
        ) {

          orderStatus =
            "Confirmed";

        } else if (
          status === "Picked Up"
        ) {

          orderStatus =
            "Out for Delivery";

        } else if (
          status === "Out for Delivery"
        ) {

          orderStatus =
            "Out for Delivery";

        } else if (
          status === "Delivered"
        ) {

          orderStatus =
            "Delivered";

        } else if (
          status === "Cancelled"
        ) {

          orderStatus =
            "Cancelled";
        }


        // -------------------------------------------------
        // Update delivery status + time
        // -------------------------------------------------

        let deliverySQL = "";
        let deliveryValues = [];


        if (
          status === "Picked Up"
        ) {

          deliverySQL = `
            UPDATE Deliveries
            SET
              status = ?,
              pickup_time = NOW()
            WHERE id = ?
          `;

          deliveryValues = [
            status,
            deliveryId
          ];

        } else if (
          status === "Delivered"
        ) {

          deliverySQL = `
            UPDATE Deliveries
            SET
              status = ?,
              delivery_time = NOW()
            WHERE id = ?
          `;

          deliveryValues = [
            status,
            deliveryId
          ];

        } else {

          deliverySQL = `
            UPDATE Deliveries
            SET status = ?
            WHERE id = ?
          `;

          deliveryValues = [
            status,
            deliveryId
          ];
        }


        db.query(
          deliverySQL,
          deliveryValues,
          (err, result) => {

            if (err) {

              console.error(
                "Delivery status update failed:",
                err
              );

              return res
                .status(500)
                .json({
                  success: false,
                  message:
                    "Delivery status update failed"
                });
            }


            // -------------------------------------------------
            // Sync Order status
            // -------------------------------------------------

            if (
              orderStatus
            ) {

              db.query(
                "UPDATE Orders SET status = ? WHERE id = ?",
                [
                  orderStatus,
                  orderId
                ],
                (err, orderResult) => {

                  if (err) {

                    console.error(
                      "Order sync error:",
                      err
                    );

                    return res
                      .status(500)
                      .json({
                        success: false,
                        message:
                          "Delivery updated but order sync failed",
                        delivery_id:
                          Number(deliveryId),
                        delivery_status:
                          status
                      });
                  }


                  console.log(
                    `Delivery #${deliveryId} updated to ${status}`
                  );

                  console.log(
                    `Order #${orderId} automatically updated to ${orderStatus}`
                  );


                  return res.json({
                    success: true,

                    message:
                      "Delivery and order updated successfully",

                    delivery_id:
                      Number(deliveryId),

                    order_id:
                      Number(orderId),

                    delivery_status:
                      status,

                    order_status:
                      orderStatus
                  });

                }
              );

            } else {

              return res.json({
                success: true,

                message:
                  "Delivery updated successfully",

                delivery_id:
                  Number(deliveryId),

                delivery_status:
                  status
              });

            }

          }
        );

      }
    );

  }
);


// =====================================================
// START SERVER
// =====================================================

const PORT =
  process.env.PORT || 3000;


app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

    console.log(
      "MySQL connected!"
    );

  }
);
