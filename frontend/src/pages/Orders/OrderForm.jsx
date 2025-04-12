import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableProducts,
  fetchAvailablePromotions,
  fetchUsers,
  createOrder,
  calculateDiscount,
} from "../../services/orderService";
import {
  fetchAvailableProductsSuccess,
  fetchAvailablePromotionsSuccess,
  fetchUsersData,
  setCurrentOrder,
  addOrderItem,
  removeOrderItem,
  updateOrderItemQuantity,
  applyPromotionToItem,
  clearCurrentOrder,
  createOrderSuccess,
} from "../../store/reducers/orderReducer";
import {
  Select,
  Button,
  Group,
  LoadingOverlay,
  Table,
  NumberInput,
  TextInput,
  Badge,
  Text,
  Card,
  Stack,
  Divider,
  ActionIcon,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconDiscount, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productsLoading, setProductsLoading] = useState(false);

  const { currentOrder, availableProducts, availablePromotions,users } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    const loadData = async () => {
      setProductsLoading(true);
      try {
        const [products, promotions,users] = await Promise.all([
          fetchAvailableProducts(),
          fetchAvailablePromotions(),
          fetchUsers(),
        ]);
        dispatch(fetchAvailableProductsSuccess(products));
        dispatch(fetchAvailablePromotionsSuccess(promotions));
        dispatch(fetchUsersData(users));

        // Initialize new order if none exists
        if (!currentOrder) {
          dispatch(
            setCurrentOrder({
              customerId: null,
              items: [],
              appliedPromotions: [],
            })
          );
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setProductsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const handleAddItem = () => {
    if (!selectedProduct || quantity < 1) return;

    dispatch(
      addOrderItem({
        productId: Number(selectedProduct.id), // Ensure number
        name: selectedProduct.name,
        price: selectedProduct.price,
        weight: selectedProduct.weight,
        quantity,
        appliedPromotion: null,
      })
    );
    notifications.show({
      title: "Success",
      message: "Item added to order",
      color: "green",
    });
    setSelectedProduct(null);
    setQuantity(1);
    close();
  };

  const handleRemoveItem = (index) => {
    dispatch(removeOrderItem(index));
  };

  const handleQuantityChange = (index, value) => {
    dispatch(updateOrderItemQuantity({ index, quantity: value }));
  };

  const handleApplyPromotion = (itemIndex, promotionId) => {
    dispatch(
      applyPromotionToItem({
        itemIndex,
        promotionId: promotionId ? Number(promotionId) : null,
      })
    );
  };

  const calculateOrderSummary = () => {
    if (!currentOrder?.items) return { subtotal: 0, discount: 0, total: 0 };

    const subtotal = currentOrder.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discount = currentOrder.items.reduce((sum, item) => {
      if (!item.appliedPromotion) return sum;

      const promotion = availablePromotions.find(
        (p) => p.id === item.appliedPromotion
      );
      if (!promotion) return sum;

      return (
        sum +
        calculateDiscount(
          availableProducts.find((p) => p.id === item.productId),
          promotion,
          item.quantity
        )
      );
    }, 0);

    return {
      subtotal,
      discount,
      total: subtotal - discount,
    };
  };

  const { subtotal, discount, total } = calculateOrderSummary();

  const handleSubmit = async () => {
    if (!customerId || currentOrder.items.length === 0) return;

    setLoading(true);
    try {
      const orderData = {
        customerId,
        items: currentOrder.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          appliedPromotion: item.appliedPromotion,
        })),
      };

      const newOrder = await createOrder(orderData);
      dispatch(createOrderSuccess(newOrder));
      dispatch(clearCurrentOrder());
      navigate("/orders");
    } catch (err) {
      console.error("Failed to create order:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto relative">
      <LoadingOverlay visible={loading} />
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <Card withBorder shadow="sm" radius="md" className="lg:col-span-1">
          <Text size="lg" fw={500} mb="md">
            Customer Information
          </Text>
          <Select
            placeholder="Select User"
            value={customerId}
            onChange={(value) => setCustomerId(value)}
            data={users.map((user) => ({
                value: String(user.id),
                label: `${user.name}`,
              }))}
          />
          {/* <TextInput
            label="Customer ID"
            placeholder="Enter customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          /> */}
        </Card>

        {/* Order Items */}
        <Card withBorder shadow="sm" radius="md" className="lg:col-span-2">
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={500}>
              Order Items
            </Text>
            <Button onClick={open}>Add Item</Button>
          </Group>

          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Promotion</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {currentOrder?.items?.map((item, index) => {
                const product = availableProducts.find(
                  (p) => p.id === item.productId
                );
                const promotion = item.appliedPromotion
                  ? availablePromotions.find(
                      (p) => p.id === item.appliedPromotion
                    )
                  : null;

                const itemDiscount = promotion
                  ? calculateDiscount(product, promotion, item.quantity)
                  : 0;

                return (
                  <Table.Tr key={index}>
                    <Table.Td>{item.name}</Table.Td>
                    <Table.Td>${item.price.toFixed(2)}</Table.Td>
                    <Table.Td>
                      <NumberInput
                        min={1}
                        value={item.quantity}
                        onChange={(value) => handleQuantityChange(index, value)}
                        style={{ width: 80 }}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Select
                        placeholder="Select promotion"
                        value={
                          item.appliedPromotion
                            ? String(item.appliedPromotion)
                            : null
                        }
                        onChange={(value) =>
                          handleApplyPromotion(
                            index,
                            value ? Number(value) : null
                          )
                        }
                        data={(availablePromotions || [])
                          .filter((p) => {
                            return (
                              p.type === "fixed" ||
                              p.type === "percentage" ||
                              (p.type === "weighted" &&
                                p.slabs.some((s) => {
                                  return (
                                    s.minWeight <=
                                      product?.weight * item.quantity &&
                                    (!s.maxWeight ||
                                      product?.weight * item.quantity <=
                                        s.maxWeight)
                                  );
                                }))
                            );
                          })
                          .map((p) => ({
                            value: String(p.id), // Convert to string
                            label: `${p.title} (${p.type})`,
                          }))}
                      />

                      {promotion && (
                        <Text size="xs" c="dimmed">
                          Discount: ${itemDiscount.toFixed(2)}
                        </Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      ${(item.price * item.quantity - itemDiscount).toFixed(2)}
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Card>

        {/* Order Summary */}
        <Card withBorder shadow="sm" radius="md" className="lg:col-span-3">
          <Text size="lg" fw={500} mb="md">
            Order Summary
          </Text>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text>Subtotal:</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </Group>
            <Group justify="space-between">
              <Text>Discount:</Text>
              <Text c="red">-${discount.toFixed(2)}</Text>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Text fw={600}>Grand Total:</Text>
              <Text fw={600}>${total.toFixed(2)}</Text>
            </Group>
            <Button
              onClick={handleSubmit}
              disabled={!customerId || currentOrder?.items?.length === 0}
              fullWidth
              mt="md"
            >
              Place Order
            </Button>
          </Stack>
        </Card>
      </div>

      {/* Add Item Modal */}
      <Modal opened={opened} onClose={close} title="Add Product">
        <Select
          label="Product"
          placeholder={
            productsLoading ? "Loading products..." : "Select product"
          }
          data={(availableProducts || []).map((product) => ({
            value: String(product.id), // Convert to string
            label: `${product.name || "Unknown"} ($${(
              product.price || 0
            ).toFixed(2)})`,
          }))}
          value={selectedProduct?.id ? String(selectedProduct.id) : null}
          onChange={(value) => {
            const product = (availableProducts || []).find(
              (p) => String(p.id) === value
            );
            setSelectedProduct(product || null);
          }}
          searchable
          required
          disabled={productsLoading}
        />
        <NumberInput
          label="Quantity"
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(Number(value) || 1)}
          mt="md"
          required
        />
        <Button
          fullWidth
          mt="md"
          onClick={handleAddItem}
          disabled={!selectedProduct}
        >
          Add to Order
        </Button>
      </Modal>
    </div>
  );
};

export default OrderForm;
