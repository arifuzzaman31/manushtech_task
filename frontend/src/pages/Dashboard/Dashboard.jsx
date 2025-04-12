// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchPromotions,
  fetchOrders,
  fetchStats
} from "../../services/dashboardService";
import {
  fetchDashboardDataStart,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailure,
} from "../../store/reducers/dashboardReducer";
import {
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Progress,
  Title,
  Avatar,
  Divider,
  SimpleGrid,
  Paper,
  Center,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconBox,
  IconDiscount2,
  IconShoppingCart,
  IconTrendingUp,
  IconCurrencyTaka,
  IconStar,
  IconUser,
  IconDualScreen,
} from "@tabler/icons-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, products, promotions, orders, stats, pagination } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(fetchDashboardDataStart());
        const [products, promotions, orders, stats] = await Promise.all([
          fetchProducts(),
          fetchPromotions(),
          fetchOrders(),
          fetchStats(),
        ]);
        dispatch(fetchDashboardDataSuccess({ products, promotions, orders }));
      } catch (err) {
        dispatch(fetchDashboardDataFailure(err.message));
      }
    };
    loadData();
  }, [dispatch]);
  if (loading) {
    return <LoadingOverlay visible />;
  }

  // Sample data for the pie chart (replace with your actual data)
  const productCategories = {
    labels: ["Electronics", "Clothing", "Groceries", "Home Goods"],
    datasets: [
      {
        data: [12, 19, 8, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Stack spacing="xl">
      {/* Top Stats Cards */}
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: "md", cols: 2 }]}>
        <StatCard
          icon={<IconBox size={24} />}
          color="blue"
          title="Total Products"
          value={products?.data?.length || 0}
          change={stats?.productChange || 0}
        />
        <StatCard
          icon={<IconDiscount2 size={24} />}
          color="orange"
          title="Active Promotions"
          value={promotions?.length || 0}
          change={stats?.promotionChange || 0}
        />
        <StatCard
          icon={<IconShoppingCart size={24} />}
          color="green"
          title="Total Orders"
          value={orders?.length || 0}
          change={stats?.orderChange || 0}
        />
        <StatCard
          icon={<IconCurrencyTaka size={24} />}
          color="grape"
          title="Revenue"
          value={`৳${stats?.totalRevenue?.toLocaleString() || 0}`}
          change={stats?.revenueChange || 0}
        />
      </SimpleGrid>

      {/* Main Content Grid */}
      <Grid gutter="xl">
        {/* Recent Orders */}
        <Grid.Col span={12} md={6}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart" mb="md">
              <Title order={4}>Recent Orders</Title>
              <Badge variant="light" color="gray">
                Last 5
              </Badge>
            </Group>
            <Stack spacing="sm">
              {orders?.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Product Categories */}
        <Grid.Col span={12} md={6}>
          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="md">
              Product Categories
            </Title>
            <div style={{ height: 250 }}>
              <Pie data={productCategories} />
            </div>
          </Paper>
        </Grid.Col>

        {/* Active Promotions */}
        <Grid.Col span={12}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart" mb="md">
              <Title order={4}>Active Promotions</Title>
              <Badge variant="light" color="orange">
                {promotions?.length || 0} Active
              </Badge>
            </Group>
            <SimpleGrid
              cols={3}
              breakpoints={[
                { maxWidth: "md", cols: 2 },
                { maxWidth: "sm", cols: 1 },
              ]}
            >
              {promotions
                ?.filter((p) => p.enabled)
                .slice(0, 3)
                .map((promo) => (
                  <PromotionCard key={promo.id} promotion={promo} />
                ))}
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

// Stat Card Component
const StatCard = ({ icon, color, title, value, change }) => (
  <Paper withBorder p="md" radius="md">
    <Group position="apart">
      <Text size="sm" color="dimmed">
        {title}
      </Text>
      <Avatar color={color} radius="xl" size="sm">
        {icon}
      </Avatar>
    </Group>
    <Group align="flex-end" spacing="xs" mt="md">
      <Text size="xl" weight={700}>
        {value}
      </Text>
      <Text
        color={change >= 0 ? "teal" : "red"}
        size="sm"
        weight={500}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {change >= 0 ? "+" : ""}
        {change}%
        <IconTrendingUp
          size={16}
          style={{ marginLeft: 4 }}
          color={change >= 0 ? "teal" : "red"}
        />
      </Text>
    </Group>
    <Progress
      value={Math.abs(change)}
      color={change >= 0 ? "teal" : "red"}
      mt="md"
      size="sm"
    />
  </Paper>
);

// Order Item Component
const OrderItem = ({ order }) => (
  <Paper withBorder p="sm" radius="sm">
    <Group position="apart">
      <Text weight={600}>Order #{order.id}</Text>
      <Badge color={order.status === "completed" ? "green" : "yellow"}>
        {order.status}
      </Badge>
    </Group>
    <Group position="apart" mt="xs">
      <Text size="sm" color="dimmed">
        Customer Name:
      </Text>
      <Text weight={600}>{ order?.customers?.name }</Text>
    </Group>
    <Group position="apart" mt="xs">
      <Text size="sm" color="dimmed">
        {order.items.length} items
      </Text>
      <Text weight={600}>৳{order.total.toFixed(2)}</Text>
    </Group>
  </Paper>
);

// Promotion Card Component
const PromotionCard = ({ promotion }) => (
  <Paper withBorder p="sm" radius="sm">
    <Group position="apart">
      <Text weight={600}>{promotion.title}</Text>
      <Badge color={promotion.type === "fixed" ? "blue" : "orange"}>
        {promotion.type}
      </Badge>
    </Group>
    <Divider my="sm" />
    <Text size="sm" color="dimmed">
      {promotion.slabs?.length || 0} slabs
    </Text>
    <Group position="apart" mt="sm">
      <Text size="xs">
        {new Date(promotion.startDate).toLocaleDateString()} -{" "}
        {new Date(promotion.endDate).toLocaleDateString()}
      </Text>
      <Badge variant="light" color="green">
        Active
      </Badge>
    </Group>
  </Paper>
);

export default Dashboard;
