"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Branches, Statuses } from "@/data/dummy-data"

const formSchema = z.object({
  senderName: z.string().min(2, "Name must be at least 2 characters"),
  senderPhone: z.string().min(10, "Phone number must be valid"),

  receiverName: z.string().min(2, "Receiver name must be at least 2 characters"),
  receiverPhone: z.string().min(10, "Receiver phone number must be valid"),

  fromBranch: z.string().min(1, "Please select source branch"),
  toBranch: z.string().min(1, "Please select destination branch"),

  parcelWeight: z.coerce.number().min(0.1, "Weight must be greater than 0"),

  parcelType: z.string().min(1, "Please enter parcel type"),

  totalAmount: z.coerce.number().min(0, "Amount cannot be negative"),

  notes: z.string().optional(),
})

export function ShipmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
  senderName: "",
  senderPhone: "",

  receiverName: "",
  receiverPhone: "",

  fromBranch: "",
  toBranch: "",

  parcelWeight: 0,

  parcelType: "",

  totalAmount: 0,

  notes: "",
},
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="senderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sender Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="senderPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sender Phone</FormLabel>
                <FormControl>
                  <Input placeholder="9876543210" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fromBranch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Branch</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Branches.map((branch: any) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="toBranch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To Branch</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Branches.map((branch: any) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="parcelWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcel Weight (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.1"
                    placeholder="1.5" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>Enter weight in kilograms</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount (₹)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Instructions</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Fragile items, handle with care..." 
                  className="resize-vertical min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-cargo-primary hover:bg-cargo-primary/90">
            Create Shipment
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            Save Draft
          </Button>
        </div>
      </form>
    </Form>
  )
}