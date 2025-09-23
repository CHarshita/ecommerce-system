import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Every product is carefully selected and tested to meet our high standards of quality and reliability."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving customers worldwide with fast shipping and localized support in multiple languages."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our knowledgeable team is passionate about technology and committed to helping you find the perfect products."
    }
  ];

  const stats = [
    { value: "50,000+", label: "Happy Customers" },
    { value: "1,000+", label: "Products" },
    { value: "50+", label: "Countries Served" },
    { value: "99.9%", label: "Uptime" }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      description: "Visionary leader with 15+ years in tech retail"
    },
    {
      name: "Sarah Chen",
      role: "Head of Products",
      description: "Expert in sourcing the latest tech innovations"
    },
    {
      name: "Michael Torres",
      role: "Customer Experience",
      description: "Dedicated to delivering exceptional service"
    },
    {
      name: "Emily Parker",
      role: "Technology Lead",
      description: "Engineering the future of e-commerce"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 mb-4">
          About EliteStore
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Revolutionizing Tech Shopping
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Since 2020, EliteStore has been at the forefront of bringing cutting-edge technology 
          to customers worldwide. We believe that everyone deserves access to premium electronics 
          that enhance their lives and work.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to premium technology by curating the finest electronics, 
              providing exceptional customer service, and building lasting relationships with 
              our community of tech enthusiasts.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become the world's most trusted destination for premium electronics, 
              where innovation meets accessibility, and where every customer experience 
              exceeds expectations.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          Our Impact in Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These principles guide every decision we make and every interaction we have
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind EliteStore's success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg text-muted-foreground space-y-4">
              <p>
                EliteStore was born from a simple observation: the tech shopping experience 
                was fragmented, confusing, and often disappointing. Our founders, having worked 
                in the technology industry for over a decade, recognized the need for a platform 
                that truly understood both technology and customers.
              </p>
              <p>
                Starting in a small office in 2020, we began with a curated selection of 
                premium smartphones and laptops. Our commitment to quality over quantity 
                quickly resonated with customers who were tired of sifting through endless 
                options of varying quality.
              </p>
              <p>
                Today, we've grown to serve customers in over 50 countries, but our core 
                mission remains unchanged: to make premium technology accessible to everyone 
                through exceptional products, transparent pricing, and unmatched customer service.
              </p>
              <p>
                As we look to the future, we're excited to continue innovating, expanding 
                our product range, and most importantly, serving our growing community of 
                technology enthusiasts around the world.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;