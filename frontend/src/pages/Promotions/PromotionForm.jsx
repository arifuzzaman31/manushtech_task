import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createPromotion,
  updatePromotion,
  fetchPromotionById,
} from "../../services/promotionService";
import {
  createPromotionSuccess,
  updatePromotionSuccess,
} from "../../store/reducers/promotionReducer";
import {
  TextInput,
  Select,
  // DatePicker,
  Button,
  Group,
  LoadingOverlay,
  Fieldset,
  NumberInput,
  Grid,
  Text,
  ActionIcon,
  Box,
  Badge,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
const PromotionForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      type: "fixed",
      startDate: new Date(),
      endDate: dayjs().add(7, "day").toDate(),
      slabs: [{ minWeight: 1, maxWeight: null, discount: 0 }], // Changed minWeight to 1
    },
    validate: {
      title: (value) => (value ? null : "Title is required"),
      startDate: (value) => (value ? null : "Start date is required"),
      endDate: (value, values) =>
        value && value > values.startDate
          ? null
          : "End date must be after start date",
      slabs: {
        minWeight: (value, values, path) => {
          const index = parseInt(path.split(".")[1]);
          const prevSlab = values.slabs[index - 1];
          if (index > 0 && value !== prevSlab?.maxWeight) {
            return "Min weight must match previous slab max weight";
          }
          return value > 0 ? null : "Min weight must be greater than 0";
        },
        discount: (value) => (value >= 0 ? null : "Discount must be positive"),
      },
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      const loadPromotion = async () => {
        setLoading(true);
        try {
          const promotion = await fetchPromotionById(id);
          form.setValues({
            ...promotion,
            startDate: new Date(promotion.startDate),
            endDate: new Date(promotion.endDate),
          });
        } catch (err) {
          notifications.show({
            title: "Error",
            message: "Failed to load promotion",
            color: "red",
          });
        } finally {
          setLoading(false);
        }
      };
      loadPromotion();
    }
  }, [id, isEdit]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Format dates and prepare payload
      const payload = {
        title: values.title,
        type: values.type,
        startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
        slabs: values.slabs.map((slab) => ({
          minWeight: slab.minWeight,
          maxWeight: slab.maxWeight,
          discount: slab.discount,
        })),
      };

      if (isEdit) {
        const updatedPromotion = await updatePromotion(id, payload);
        dispatch(updatePromotionSuccess(updatedPromotion));
        notifications.show({
          title: "Success",
          message: "Promotion updated successfully",
          color: "green",
        });
      } else {
        const newPromotion = await createPromotion(payload);
        dispatch(createPromotionSuccess(newPromotion));
        notifications.show({
          title: "Success",
          message: "Promotion created successfully",
          color: "green",
        });
      }
      navigate("/promotions");
    } catch (err) {
      console.error("Error:", err);
      notifications.show({
        title: "Error",
        message: err.response?.data?.message || "Operation failed",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSlab = () => {
    const lastSlab = form.values.slabs[form.values.slabs.length - 1];
    form.insertListItem("slabs", {
      minWeight: lastSlab?.maxWeight || 1,
      maxWeight: null,
      discount: 0,
    });
  };

  const removeSlab = (index) => {
    form.removeListItem("slabs", index);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      <LoadingOverlay visible={loading} />
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Promotion" : "Create Promotion"}
      </h1>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Promotion Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {isEdit
                ? "Update your promotion details"
                : "Create a new promotion"}
            </p>
          </div>

          {/* Main Form Fields */}
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Title"
                placeholder="Summer Sale 2023"
                withAsterisk
                radius="md"
                size="md"
                classNames={{
                  label: "mb-1 font-medium text-gray-700",
                  input: "focus:border-blue-400",
                }}
                {...form.getInputProps("title")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Discount Type"
                placeholder="Select type"
                withAsterisk
                radius="md"
                size="md"
                classNames={{
                  label: "mb-1 font-medium text-gray-700",
                  input: "focus:border-blue-400",
                }}
                data={[
                  { value: "fixed", label: "Fixed Amount (e.g., $5 off)" },
                  { value: "percentage", label: "Percentage (e.g., 10% off)" },
                  { value: "weighted", label: "Weight Based Discount" },
                ]}
                {...form.getInputProps("type")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <DatePicker
                label="Start Date"
                placeholder="Pick start date"
                withAsterisk
                radius="md"
                size="md"
                popoverProps={{ withinPortal: true }}
                classNames={{
                  label: "mb-1 font-medium text-gray-700",
                  input: "focus:border-blue-400",
                }}
                {...form.getInputProps("startDate")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <DatePicker
                label="End Date"
                placeholder="Pick end date"
                withAsterisk
                radius="md"
                size="md"
                popoverProps={{ withinPortal: true }}
                classNames={{
                  label: "mb-1 font-medium text-gray-700",
                  input: "focus:border-blue-400",
                }}
                minDate={form.values.startDate}
                {...form.getInputProps("endDate")}
              />
            </Grid.Col>
          </Grid>

          {/* Weight Slabs Section */}
          {form.values.type === "weighted" && (
            <Fieldset
              legend={
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    Weight Slabs
                  </span>
                  <Badge variant="light" color="blue" radius="sm">
                    {form.values.slabs.length} Slabs
                  </Badge>
                </div>
              }
              className="border border-gray-200 rounded-lg p-4"
              radius="md"
            >
              <div className="space-y-4">
                {form.values.slabs.map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                  >
                    <Grid gutter="md" align="flex-end">
                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <NumberInput
                          label="Min Weight (kg)"
                          min={0}
                          precision={2}
                          step={0.1}
                          withAsterisk
                          radius="md"
                          size="sm"
                          classNames={{
                            label: "mb-1 text-sm font-medium text-gray-700",
                            input: "focus:border-blue-400",
                          }}
                          {...form.getInputProps(`slabs.${index}.minWeight`)}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <NumberInput
                          label="Max Weight (kg)"
                          min={0}
                          precision={2}
                          step={0.1}
                          radius="md"
                          size="sm"
                          classNames={{
                            label: "mb-1 text-sm font-medium text-gray-700",
                            input: "focus:border-blue-400",
                          }}
                          description={
                            index === form.values.slabs.length - 1 ? (
                              <Text size="xs" c="dimmed">
                                Leave empty for no upper limit
                              </Text>
                            ) : null
                          }
                          {...form.getInputProps(`slabs.${index}.maxWeight`)}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <NumberInput
                          label="Discount"
                          min={0}
                          withAsterisk
                          radius="md"
                          size="sm"
                          classNames={{
                            label: "mb-1 text-sm font-medium text-gray-700",
                            input: "focus:border-blue-400",
                          }}
                          {...form.getInputProps(`slabs.${index}.discount`)}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <div className="flex justify-end">
                          {form.values.slabs.length > 1 && (
                            <Tooltip label="Remove slab">
                              <ActionIcon
                                color="red"
                                variant="subtle"
                                onClick={() => removeSlab(index)}
                                size="lg"
                              >
                                <IconTrash size={18} />
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </div>
                      </Grid.Col>
                    </Grid>
                  </div>
                ))}

                <Button
                  onClick={addSlab}
                  leftSection={<IconPlus size={18} />}
                  variant="light"
                  color="blue"
                  fullWidth
                  size="sm"
                  className="mt-2"
                >
                  Add Weight Slab
                </Button>
              </div>
            </Fieldset>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              color="gray"
              size="md"
              onClick={() => navigate("/promotions")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="blue"
              size="md"
              loading={loading}
              className="w-full sm:w-auto shadow-sm"
            >
              {isEdit ? "Update Promotion" : "Create Promotion"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
