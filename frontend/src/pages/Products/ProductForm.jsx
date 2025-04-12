import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  createProduct, 
  updateProduct, 
  fetchProductById 
} from "../../services/productService";
import { 
  createProductSuccess, 
  updateProductSuccess 
} from "../../store/reducers/productReducer";
import { 
  TextInput, 
  NumberInput, 
  Textarea, 
  Button, 
  Group, 
  Switch, 
  LoadingOverlay 
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const ProductForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      weight: 0,
      enabled: false,
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      price: (value) => (value > 0 ? null : 'Price must be greater than 0'),
      weight: (value) => (value > 0 ? null : 'Weight must be greater than 0'),
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      const loadProduct = async () => {
        setLoading(true);
        try {
          const product = await fetchProductById(id);
          form.setValues({
            name: product.name,
            description: product.description,
            price: product.price,
            weight: product.weight,
            enabled: product.enabled,
          });
        } catch (err) {
          notifications.show({
            title: 'Error',
            message: 'Failed to load product',
            color: 'red',
          });
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id, isEdit]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (isEdit) {
        const updatedProduct = await updateProduct(id, values);
        dispatch(updateProductSuccess(updatedProduct));
        notifications.show({
          title: 'Success',
          message: 'Product updated successfully',
          color: 'green',
        });
      } else {
        const newProduct = await createProduct(values);
        dispatch(createProductSuccess(newProduct));
        notifications.show({
          title: 'Success',
          message: 'Product created successfully',
          color: 'green',
        });
      }
      navigate('/products');
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err.response?.data?.message || 'Operation failed',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto relative">
      <LoadingOverlay visible={loading} />
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Product' : 'Create Product'}
      </h1>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          placeholder="Product name"
          {...form.getInputProps('name')}
          mb="md"
        />
        
        <Textarea
          label="Description"
          placeholder="Product description"
          {...form.getInputProps('description')}
          mb="md"
        />
        
        <NumberInput
          label="Price"
          placeholder="0.00"
          min={0}
          precision={2}
          {...form.getInputProps('price')}
          mb="md"
        />
        
        <NumberInput
          label="Weight (kg)"
          placeholder="0.00"
          min={0}
          precision={2}
          {...form.getInputProps('weight')}
          mb="md"
        />
        
        <Switch
          label="Enabled"
          {...form.getInputProps('enabled', { type: 'checkbox' })}
          mb="md"
        />
        
        <Group justify="flex-end">
          <Button variant="default" onClick={() => navigate('/products')}>
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default ProductForm;