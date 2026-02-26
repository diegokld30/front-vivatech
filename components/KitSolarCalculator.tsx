/* components/KitSolarCalculator.tsx */
"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";

/* --- tabla base por departamento (COP × 100) ------------- */
const KWH_BY_DEPT: Record<string, number> = {
  Amazonas: 593,
  Antioquia: 472,
  Arauca: 562,
  Atlántico: 441,
  Bolívar: 514,
  Boyacá: 483,
  Caldas: 491,
  Caquetá: 633,
  Casanare: 552,
  Cauca: 523,
  Cesar: 497,
  Chocó: 678,
  Córdoba: 456,
  Cundinamarca: 470,
  "Distrito Capital": 470,
  Guainía: 716,
  Guaviare: 641,
  Huila: 482,
  "La Guajira": 457,
  Magdalena: 482,
  Meta: 492,
  Nariño: 499,
  "Norte de Santander": 488,
  Putumayo: 574,
  Quindío: 491,
  Risaralda: 492,
  Santander: 481,
  Sucre: 451,
  Tolima: 492,
  Valle: 479,
  Vaupés: 708,
  Vichada: 735,
};

export default function KitSolarCalculator() {
  /* --------- estado ---------- */
  const [billCOP, setBillCOP] = useState(""); // factura $
  const [dept, setDept] = useState("Huila"); // dpto
  const [kwhUser, setKwhUser] = useState(""); // $/kWh opc.
  const [result, setResult] = useState<number | null>(null);

  /* --------- cálculo ---------- */
  const handleCalc = () => {
    const bill = Number(billCOP);
    const priceKwh =
      kwhUser.trim() !== ""
        ? Number(kwhUser) // valor ingresado
        : KWH_BY_DEPT[dept] / 100; // valor por defecto

    if (!bill || !priceKwh) return setResult(null);

    const kwhMes = bill / priceKwh;
    const kWpNeed = kwhMes / (4 * 30); // 4 kWh/día · kWp

    setResult(+kWpNeed.toFixed(2));
  };

  /* --------- UI --------- */
  return (
    <Card className="mx-auto max-w-lg">
      <CardBody className="space-y-6">
        {/* 1. Factura mensual */}
        <Input
          isRequired
          label="¿Cuánto pagas al mes? (COP)"
          type="number"
          value={billCOP}
          onChange={(e) => setBillCOP(e.target.value)}
        />

        {/* 2. Departamento */}
        <Select
          isRequired
          label="Departamento"
          placeholder="Selecciona un departamento"
          selectedKeys={new Set([dept])}
          onSelectionChange={(keys) => setDept(Array.from(keys)[0] as string)}
        >
          {Object.keys(KWH_BY_DEPT).map((d) => (
            <SelectItem key={d}>{d}</SelectItem>
          ))}
        </Select>

        {/* 3. Precio kWh */}
        <Input
          description={`Dejándolo vacío usaré ${(
            KWH_BY_DEPT[dept] / 100
          ).toLocaleString("es-CO")} COP correspondiente a ${dept}.`}
          label="Precio kWh (COP) – opcional"
          type="number"
          value={kwhUser}
          onChange={(e) => setKwhUser(e.target.value)}
        />

        {/* 4. Botón */}
        <Button fullWidth color="primary" onPress={handleCalc}>
          Calcular kit recomendado
        </Button>

        {/* 5. Resultado */}
        {result !== null && (
          <p className="text-center font-medium">
            Necesitas un kit de <strong>{result} kWp</strong>
          </p>
        )}
      </CardBody>
    </Card>
  );
}
