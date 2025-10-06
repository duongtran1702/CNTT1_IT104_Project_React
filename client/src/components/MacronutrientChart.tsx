import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface MacronutrientChartProps {
    fat: number;
    carbohydrate: number;
    protein: number;
}

const COLORS = ["#E64C65", "#E9A46A", "#20B2AA"];
const GRAY_COLOR = "#D3D3D3";

export const MacronutrientChart: React.FC<MacronutrientChartProps> = ({
    fat,
    carbohydrate,
    protein,
}) => {
    // ✅ Tạo dữ liệu biểu đồ
    const values = [fat, carbohydrate, protein];
    const total = values.reduce((a, b) => a + b, 0);

    // Nếu tất cả = 0 → hiển thị 3 phần bằng nhau màu xám
    const data =
        total === 0
            ? [
                  { name: "Fat", value: 1 },
                  { name: "Carbohydrate", value: 1 },
                  { name: "Protein", value: 1 },
              ]
            : [
                  { name: "Fat", value: fat },
                  { name: "Carbohydrate", value: carbohydrate },
                  { name: "Protein", value: protein },
              ];

    return (
        <div className="w-[402px] bg-white p-5 pb-3 rounded-md shadow-sm h-fit">
            {/* Tiêu đề */}
            <div className="text-left w-full mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Macronutrients
                </h2>
                <p className="text-gray-400 text-sm">
                    Macronutrients distribution of the recipe
                </p>
            </div>

            {/* Biểu đồ */}
            <div className="w-72 h-72 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        total === 0
                                            ? GRAY_COLOR
                                            : COLORS[index % COLORS.length]
                                    }
                                />
                            ))}
                        </Pie>

                        {/* Tooltip: chỉ hiện khi có giá trị > 0 */}
                        {total > 0 && (
                            <Tooltip
                                formatter={(value: number) =>
                                    `${value.toFixed(1)}%`
                                }
                            />
                        )}

                        <Legend
                            verticalAlign="bottom"
                            iconType="square"
                            iconSize={12}
                            formatter={(value: string) => (
                                <span className="text-gray-700 text-sm">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MacronutrientChart;
