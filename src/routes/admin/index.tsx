import { RegisterForm } from "@/components/forms/register";
import { Posts } from "@/components/Posts";
import { Schedule } from "@/components/Schedule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserStatus } from "@/components/UserStatus";
import { requireAuth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    return await requireAuth();
  },

  component: Admin,
});

function Admin() {
  return (
    <div className="min-h-screen mt-24">
      <div className="flex justify-end">
        <UserStatus />
      </div>
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="notice">Notice</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <Posts />
        </TabsContent>
        <TabsContent value="notice">
          <Schedule />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
