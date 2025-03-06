<template>
  <main class="container mx-auto px-4 py-8">

    <!-- Feature 1 -->
    <section class="grid md:grid-cols-2 gap-8 items-center mb-16">
      <div class="space-y-4  ml-24 mr-24">
        <h3 class="text-2xl font-semibold text-foreground">Get the answers you want</h3>
        <p class="text-muted-foreground">
          Transform your surveys into engaging conversations. Our intelligent chat interface makes respondents feel heard and understood, leading to more honest, detailed responses and higher completion rates. Perfect for qualitative research, customer feedback, and employee engagement surveys.
        </p>
      </div>
      <div class="relative p-4">
        <!-- Chat interface miniature -->
        <div class="space-y-4 max-w-[400px] mx-auto">
          <div class="flex flex-col gap-3">
            <!-- AI Message -->
            <div class="flex gap-3 items-start">
              <Avatar class="w-8 h-8">
                <AvatarImage src="https://g-r2xql6awum4.vusercontent.net/placeholder.svg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div class="bg-muted p-3 rounded-lg text-sm max-w-[80%]">
                How would you rate your experience with our product?
              </div>
            </div>
            <!-- User Message -->
            <div class="flex gap-3 items-start justify-end">
              <div class="bg-primary text-primary-foreground p-3 rounded-lg text-sm max-w-[80%]">
                I really enjoyed using it! The interface is intuitive.
              </div>
              <Avatar class="w-8 h-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <!-- Input -->
            <div class="mt-4">
              <div class="relative">
                <Input placeholder="Type your response..." class="pr-20" />
                <Button size="sm" class="absolute right-1 top-1">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature 2 -->
    <section class="grid md:grid-cols-2 gap-8 items-center mb-16">
      <div class="relative p-4">
        <!-- Analytics dashboard miniature -->
        <div class="space-y-4 max-w-[500px] mx-auto">
          <div class="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader class="p-4">
                <CardTitle class="text-sm">Response Rate</CardTitle>
              </CardHeader>
              <CardContent class="p-4 pt-0">
                <div class="text-2xl font-bold">85%</div>
                <p class="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="p-4">
                <CardTitle class="text-sm">Avg. Time</CardTitle>
              </CardHeader>
              <CardContent class="p-4 pt-0">
                <div class="text-2xl font-bold">4m 30s</div>
                <p class="text-xs text-muted-foreground">-30s from last month</p>
              </CardContent>
            </Card>
          </div>
          <Card class="relative z-10 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-card/95 backdrop-blur">
            <CardHeader class="p-4">
              <CardTitle class="text-base font-semibold">Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent class="p-4 pt-0">
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <div class="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div class="h-full bg-green-500 w-[75%] transition-all duration-500"></div>
                  </div>
                  <span class="text-sm font-medium">75%</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div class="h-full bg-yellow-500 w-[15%] transition-all duration-500"></div>
                  </div>
                  <span class="text-sm font-medium">15%</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div class="h-full bg-red-500 w-[10%] transition-all duration-500"></div>
                  </div>
                  <span class="text-sm font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div class="space-y-4  ml-24 mr-24">
        <h3 class="text-2xl font-semibold text-foreground">Analyze the data and get insights</h3>
        <p class="text-muted-foreground">
          Design dynamic surveys in minutes, not hours. Our intuitive interface lets you craft intelligent conversation flows, set response expectations, and create branching logic with ease. No coding required - just your expertise and our AI's capabilities working together.
        </p>
      </div>
    </section>

    <!-- Feature 3 -->
    <section class="grid md:grid-cols-2 gap-8 items-center mb-16">
      <div class="space-y-4  ml-24 mr-24">
        <h3 class="text-2xl font-semibold text-foreground">Start instantly with ready-to-use templates</h3>
        <p class="text-muted-foreground">
          Hit the ground running with our collection of professionally designed survey templates. From customer feedback and market research to employee satisfaction and event feedback - we've got you covered. Each template is fully customizable and optimized for conversational AI interactions, saving you time while ensuring best practices.
        </p>
      </div>
      <div class="relative p-4">
        <!-- Template gallery miniature -->
        <div class="grid grid-cols-2 gap-6 max-w-[500px] mx-auto">
          <Card class="cursor-pointer hover:border-primary transition-colors group">
            <CardHeader class="p-4 space-y-3">
              <div class="flex items-center justify-between">
                <Badge variant="secondary" class="text-xs font-medium">Popular</Badge>
              </div>
              <CardTitle class="text-base">Customer Feedback</CardTitle>
              <p class="text-sm text-muted-foreground">10 questions</p>
            </CardHeader>
          </Card>
          <Card class="cursor-pointer hover:border-primary transition-colors group">
            <CardHeader class="p-4 space-y-3">
              <div class="flex items-center justify-between h-6">
                <!-- Empty div to maintain consistent spacing -->
              </div>
              <CardTitle class="text-base">Employee Survey</CardTitle>
              <p class="text-sm text-muted-foreground">15 questions</p>
            </CardHeader>
          </Card>
          <Card class="cursor-pointer hover:border-primary transition-colors group">
            <CardHeader class="p-4 space-y-3">
              <div class="flex items-center justify-between h-6">
                <!-- Empty div to maintain consistent spacing -->
              </div>
              <CardTitle class="text-base">Market Research</CardTitle>
              <p class="text-sm text-muted-foreground">12 questions</p>
            </CardHeader>
          </Card>
          <Card class="cursor-pointer hover:border-primary transition-colors group">
            <CardHeader class="p-4 space-y-3">
              <div class="flex items-center justify-between">
                <Badge variant="secondary" class="text-xs font-medium">New</Badge>
              </div>
              <CardTitle class="text-base">Event Feedback</CardTitle>
              <p class="text-sm text-muted-foreground">8 questions</p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
</script>