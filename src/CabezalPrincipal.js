import React, { useState, useEffect } from "react";

export function CabezalPrincipal() {
  const name = "Flokzu Bienvenidos";

  return (
    <h1
      style={{
        color: "#333",
        fontSize: "32px",
        marginBottom: "16px",
        padding: "8px",
        backgroundColor: "#eee",
        textAlign: "center",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {name}
    </h1>
  );
}
