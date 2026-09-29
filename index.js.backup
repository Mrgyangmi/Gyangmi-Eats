








































const express = require("express");
const db = require("./db");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + "/frontend"));

app.get("/menu.html", (req, res) => {
  res.sendFile(__dirname + "/frontend/menu.html");
});

// ==================== HOME ====================

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});

// ==================== USERS ====================

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) {
      console.log("User query failed:", err);
      return res.status(500).send("Database query failed");
    }

    res.json(results);
  });
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
    [name, email, password, phone],
    (err, result) => {
      if (err) {
        console.log("User insert failed:", err);
        return res.status(500).send("User registration failed");
      }

      res.send("User registered successfully!");
    }
  );
});

// ==================== RESTAURANTS ====================

// Get all restaurants
app.get("/restaurants", (req, res) => {
  db.query("SELECT * FROM Restaurants", (err, results) => {
    if (err) {
      console.log("Restaurant query failed:", err);
      return res.status(500).send("Restaurant query failed: " + err.message);
    }

    res.json(results);
  });
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
    [name, description, phone, owner_id],
    (err, result) => {
      if (err) {
        console.log("Restaurant insert failed:", err);
        return res.status(500).send("Restaurant registration failed");
      }

      res.send("Restaurant added successfully!");
    }
  );
});

// ==================== RESTAURANT CATEGORIES ====================

// Get restaurant categories
app.get("/restaurant-categories", (req, res) => {
  db.query(
    "SELECT * FROM RestaurantCategories",
    (err, results) => {
      if (err) {
        console.log("Category query failed:", err);
        return res.status(500).send("Category query failed");
      }

      res.json(results);
    }
  );
});

// Add restaurant category
app.post("/restaurant-categories", (req, res) => {
  const {
    restaurant_id,
    name
  } = req.body;

  const sql =
    "INSERT INTO RestaurantCategories (restaurant_id, name) VALUES (?, ?)";

  db.query(
    sql,
    [restaurant_id, name],
    (err, result) => {
      if (err) {
        console.log("Category insert failed:", err);
        return res.status(500).send("Category registration failed");
      }

      res.send("Restaurant category added successfully!");
    }
  );
});

// ==================== MENUS ====================

// Get all menus
app.get("/menus", (req, res) => {
  db.query("SELECT * FROM Menus", (err, results) => {
    if (err) {
      console.log("Menu query failed:", err);
      return res.status(500).send("Menu query failed");
    }

    res.json(results);
  });
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
    [restaurant_id, name, description, price, category_id],
    (err, result) => {
      if (err) {
        console.log("Menu insert failed:", err);
        return res.status(500).send("Menu registration failed");
      }

      res.send("Menu added successfully!");
    }
  );
});

// ==================== ADDRESSES ====================

// Get all addresses
app.get("/addresses", (req, res) => {
  db.query("SELECT * FROM Addresses", (err, results) => {
    if (err) {
      console.log("Address query failed:", err);
      return res.status(500).send("Address query failed");
    }

    res.json(results);
  });
});

// Add new address
app.post("/addresses", (req, res) => {
  const {
    user_id,
    address_line,
    city,
    postal_code,
    latitude,
    longitude
  } = req.body;

  const sql =
    "INSERT INTO Addresses (user_id, address_line, city, postal_code, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      user_id,
      address_line,
      city,
      postal_code || null,
      latitude || null,
      longitude || null
    ],
    (err, result) => {
      if (err) {
        console.log("Address insert failed:", err);
        return res.status(500).send("Address creation failed");
      }

      res.send("Address added successfully!");
    }
  );
});

// ==================== FOODS ====================

// Get all foods
app.get("/foods", (req, res) => {
  db.query("SELECT * FROM Foods", (err, results) => {
    if (err) {
      console.log("Food query failed:", err);
      return res.status(500).send("Food query failed");
    }

    res.json(results);
  });
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
    [restaurant_id, name, description, price, category_id],
    (err, result) => {
      if (err) {
        console.log("Food insert failed:", err);
        return res.status(500).send("Food creation failed");
      }

      res.send("Food added successfully!");
    }
  );
});

// ==================== FOOD CATEGORIES ====================

// Get all food categories
app.get("/food-categories", (req, res) => {
  db.query(
    "SELECT * FROM FoodCategories",
    (err, results) => {
      if (err) {
        console.log("Food category query failed:", err);
        return res.status(500).send("Food category query failed");
      }

      res.json(results);
    }
  );
});

// Add food category
app.post("/food-categories", (req, res) => {
  const {
    restaurant_id,
    name
  } = req.body;

  const sql =
    "INSERT INTO FoodCategories (restaurant_id, name) VALUES (?, ?)";

  db.query(
    sql,
    [restaurant_id, name],
    (err, result) => {
      if (err) {
        console.log("Food category insert failed:", err);
        return res.status(500).send("Food category creation failed");
      }

      res.send("Food category added successfully!");
    }
  );
});

// ==================== CART ====================

// Get all carts
app.get("/cart", (req, res) => {
  db.query("SELECT * FROM Cart", (err, results) => {
    if (err) {
      console.log("Cart query failed:", err);
      return res.status(500).send("Cart query failed");
    }

    res.json(results);
  });
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
        console.log("Cart insert failed:", err);
        return res.status(500).send("Cart creation failed");
      }

      res.send("Cart created successfully!");
    }
  );
});

// ==================== CART ITEMS ====================

// Get all cart items
app.get("/cart-items", (req, res) => {
  db.query(
    "SELECT * FROM CartItems",
    (err, results) => {
      if (err) {
        console.log("Cart item query failed:", err);
        return res.status(500).send("Cart item query failed");
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
    [cart_id, menu_id, quantity, price],
    (err, result) => {
      if (err) {
        console.log("Cart item insert failed:", err);
        return res.status(500).send("Cart item creation failed");
      }

      res.send("Cart item added successfully!");
    }
  );
});

// ==================== ORDERS ====================

// Get all orders
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM Orders", (err, results) => {
    if (err) {
      console.log("Order query failed:", err);
      return res.status(500).send("Order query failed");
    }

    res.json(results);
  });
});

// Get single order
app.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;

  db.query(
    "SELECT * FROM Orders WHERE id = ?",
    [orderId],
    (err, results) => {
      if (err) {
        console.log("Single order query failed:", err);
        return res.status(500).send("Order query failed");
      }

      if (results.length === 0) {
        return res.status(404).send("Order not found");
      }

      res.json(results[0]);
    }
  );
});

// Create new order
app.post("/orders", (req, res) => {
  const {
    user_id,
    restaurant_id,
    total_amount,
    status
  } = req.body;

  const sql =
    "INSERT INTO Orders (user_id, restaurant_id, total_amount, status) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      user_id,
      restaurant_id,
      total_amount,
      status || "Pending"
    ],
    (err, result) => {
      if (err) {
        console.log("Order insert failed:", err);
        return res.status(500).send("Order creation failed");
      }

      res.json({
        message: "Order created successfully!",
        order_id: result.insertId
      });
    }
  );
});

// ==================== ORDER ITEMS ====================

// Get all order items
app.get("/order-items", (req, res) => {
  db.query(
    "SELECT * FROM OrderItems",
    (err, results) => {
      if (err) {
        console.log("Order item query failed:", err);
        return res.status(500).send("Order item query failed");
      }

      res.json(results);
    }
  );
});

// Get order items by order ID
app.get("/order-items/:order_id", (req, res) => {
  const orderId = req.params.order_id;

  db.query(
    "SELECT * FROM OrderItems WHERE order_id = ?",
    [orderId],
    (err, results) => {
      if (err) {
        console.log("Order items query failed:", err);
        return res.status(500).send("Order items query failed");
      }

      res.json(results);
    }
  );
});

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
    [order_id, menu_id, quantity, price],
    (err, result) => {
      if (err) {
        console.log("Order item insert failed:", err);
        return res.status(500).send("Order item creation failed");
      }

      res.send("Order item added successfully!");
    }
  );
});

// ==================== PAYMENTS ====================

// Get all payments
app.get("/payments", (req, res) => {
  db.query("SELECT * FROM Payments", (err, results) => {
    if (err) {
      console.log("Payment query failed:", err);
      return res.status(500).send("Payment query failed");
    }

    res.json(results);
  });
});

// Get payment by order ID
app.get("/payments/:order_id", (req, res) => {
  const orderId = req.params.order_id;

  db.query(
    "SELECT * FROM Payments WHERE order_id = ?",
    [orderId],
    (err, results) => {
      if (err) {
        console.log("Payment query failed:", err);
        return res.status(500).send("Payment query failed");
      }

      res.json(results);
    }
  );
});

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
        console.log("Payment insert failed:", err);
        return res.status(500).send("Payment creation failed");
      }

      res.send("Payment added successfully!");
    }
  );
});

// ==================== REVIEWS ====================

// Get all reviews
app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM Reviews", (err, results) => {
    if (err) {
      console.log("Review query failed:", err);
      return res.status(500).send("Review query failed");
    }

    res.json(results);
  });
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
    [user_id, restaurant_id, rating, comment],
    (err, result) => {
      if (err) {
        console.log("Review insert failed:", err);
        return res.status(500).send("Review creation failed");
      }

      res.send("Review added successfully!");
    }
  );
});

// ==================== DELIVERY DRIVERS ====================

// Get all delivery drivers
app.get("/delivery-drivers", (req, res) => {
  db.query(
    "SELECT * FROM DeliveryDrivers",
    (err, results) => {
      if (err) {
        console.log("Driver query failed:", err);
        return res.status(500).send("Driver query failed");
      }

      res.json(results);
    }
  );
});

// Add delivery driver
app.post("/delivery-drivers", (req, res) => {
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
        console.log("Driver insert failed:", err);
        return res.status(500).send("Driver creation failed");
      }

      res.send("Delivery driver added successfully!");
    }
  );
});

// ==================== DELIVERIES ====================

// Get all deliveries
app.get("/deliveries", (req, res) => {
  db.query(
    "SELECT * FROM Deliveries",
    (err, results) => {
      if (err) {
        console.log("Delivery query failed:", err);
        return res.status(500).send("Delivery query failed");
      }

      res.json(results);
    }
  );
});

// Create delivery
app.post("/deliveries", (req, res) => {
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
        console.log("Delivery insert failed:", err);
        return res.status(500).send("Delivery creation failed");
      }

      res.send("Delivery added successfully!");
    }
  );
});

// ==================== COUPONS ====================

// Get all coupons
app.get("/coupons", (req, res) => {
  db.query("SELECT * FROM Coupons", (err, results) => {
    if (err) {
      console.log("Coupon query failed:", err);
      return res.status(500).send("Coupon query failed");
    }

    res.json(results);
  });
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
        console.log("Coupon insert failed:", err);
        return res.status(500).send("Coupon creation failed");
      }

      res.send("Coupon created successfully!");
    }
  );
});

// ==================== FAVORITES ====================

// Get all favorites
app.get("/favorites", (req, res) => {
  db.query(
    "SELECT * FROM Favorites",
    (err, results) => {
      if (err) {
        console.log("Favorite query failed:", err);
        return res.status(500).send("Favorite query failed");
      }

      res.json(results);
    }
  );
});

// Add favorite
app.post("/favorites", (req, res) => {
  const {
    user_id,
    restaurant_id
  } = req.body;

  const sql =
    "INSERT INTO Favorites (user_id, restaurant_id) VALUES (?, ?)";

  db.query(
    sql,
    [user_id, restaurant_id],
    (err, result) => {
      if (err) {
        console.log("Favorite insert failed:", err);
        return res.status(500).send("Favorite creation failed");
      }

      res.send("Favorite added successfully!");
    }
  );
});
// ==================== DELETE FAVORITE ====================

app.delete("/favorites/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM Favorites WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log("Favorite delete failed:", err);
        return res.status(500).send("Failed to remove favorite.");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Favorite not found.");
      }

      console.log(`Favorite #${id} removed successfully`);

      res.send("Favorite removed successfully.");
    }
  );
});
// ==================== UPDATE ORDER STATUS ====================

// Update order status
app.patch("/orders/:id/status", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order status"
    });
  }

  const sql =
    "UPDATE Orders SET status = ? WHERE id = ?";

  db.query(
    sql,
    [status, orderId],
    (err, result) => {
      if (err) {
        console.log("Order status update failed:", err);

        return res.status(500).json({
          success: false,
          message: "Order status update failed"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      res.json({
        success: true,
        message: "Order status updated successfully!",
        order_id: Number(orderId),
        status: status
      });
    }
  );
});
// ==================== START SERVER ====================
// =====================================================
// UPDATE ORDER STATUS
// =====================================================

app.patch("/orders/:id/status", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send("Status is required");
  }

  const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).send("Invalid status");
  }

  const sql = `
    UPDATE Orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, orderId], (err, result) => {
    if (err) {
      console.log("Order status update failed:", err);
      return res.status(500).send("Order status update failed");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Order not found");
    }

    res.send("Order status updated successfully!");
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
  console.log("MySQL connected!");
});
/* =====================================================
   UPDATE ORDER STATUS
===================================================== */

app.patch("/orders/:id/status", (req, res) => {

  const orderId = req.params.id;
  const { status } = req.body;

  console.log("Updating Order:", orderId);
  console.log("New Status:", status);

  if (!status) {
    return res.status(400).send("Status is required");
  }

  const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).send("Invalid status");
  }

  const sql = `
    UPDATE Orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, orderId],
    (err, result) => {

      if (err) {
        console.log(
          "Order status update failed:",
          err
        );

        return res
          .status(500)
          .send("Order status update failed");
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .send("Order not found");
      }

      console.log(
        `Order #${orderId} updated to ${status}`
      );

      res.send(
        "Order status updated successfully!"
      );
    }
  );

});
// Update delivery status
app.patch("/deliveries/:id/status", (req, res) => {
  const deliveryId = req.params.id;
  const { status } = req.body;

  console.log("DELIVERY STATUS UPDATE");
  console.log("Delivery ID:", deliveryId);
  console.log("New Status:", status);

  if (!status) {
    return res.status(400).send("Status is required");
  }

  const allowedStatuses = [
    "Assigned",
    "Picked Up",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).send("Invalid delivery status");
  }

  const sql = `
    UPDATE Deliveries
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, deliveryId], (err, result) => {
    if (err) {
      console.log("Delivery status update failed:", err);
      return res.status(500).send("Delivery status update failed");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Delivery not found");
    }

    console.log(
      `Delivery #${deliveryId} updated to ${status}`
    );

    res.send("Delivery status updated successfully!");
  });
});
