# Use Cases

> Real-world examples of dataspaces in action

---

## Data Spaces Radar

The **[Data Spaces Radar](https://dssc.eu/space/radar)** by the Data Spaces Support Centre (DSSC) tracks over 100 initiatives across Europe. Here are some key patterns relevant to adopters.

---

## 1. Digital Product Passport (DPP)

**Industry:** Automotive, Manufacturing, Textiles  
**Goal:** Trace the lifecycle of a product (e.g., EV Battery) from raw material to recycling ensuring circular economy compliance.

*   **The Problem:** Battery composition data is confidential to the supplier, but the recycler needs to know it. Both parties don't trust a central database.
*   **The Dataspace Solution:**
    *   Supplier registers "Battery Composition" asset.
    *   Policy: "Access allowed only for Certified Recyclers".
    *   Recycler requests data only when physically holding the battery.
*   **Example:** [Catena-X](https://catena-x.net/)

---

## 2. Calculation of CO2 Footprint (PCF)

**Industry:** Cross-industry (Supply Chain)  
**Goal:** Calculate the total carbon footprint of a finished product by aggregating footprints of all sub-components.

*   **The Problem:** Suppliers do not want to reveal their exact supply chain or energy sources (trade secrets).
*   **The Dataspace Solution:**
    *   Manufacturer sends a "Calculation Request" to Supplier A's app.
    *   Supplier A computes the value locally and returns *only* the final CO2 number.
    *   Sensitive data never leaves the supplier's premises.
*   **Key Concept:** "Compute-to-Data" or App Ecosystems.

---

## 3. Smart City & Mobility

**Industry:** Public Sector, Transport  
**Goal:** Optimize traffic flow and parking without compromising citizen privacy.

*   **The Problem:** City needs data from ride-sharing apps, but companies won't share user locations due to GDPR.
*   **The Dataspace Solution:**
    *   Ride-sharing companies publish valid "Traffic Density" datasets (anonymized aggregates).
    *   City connects to multiple providers to build a real-time map.
    *   Standard policies ensure data is used *only* for traffic optimization.
*   **Example:** [Mobility Data Space](https://mobility-dataspace.eu/)

---

## 4. Collaborative Maintenance

**Industry:** Aviation, Energy  
**Goal:** Optimize maintenance schedules for shared assets (e.g., aircraft engines, wind turbines).

*   **The Problem:** The operator owns the asset, but the manufacturer has the expertise (and algorithms) to predict failures.
*   **The Dataspace Solution:**
    *   Operator grants Manufacturer access to sensor data logs for specific assets.
    *   Manufacturer runs predictive algorithms and returns a "Maintenance Recommendation".
    *   Access is time-bound and strictly purpose-limited.

---

## Explore More

*   [IDSA Use Case Hub](https://internationaldataspaces.org/adopt/use-cases/)
*   [Sitram (Simulation of Transport)](https://www.sitram-project.eu/)
