class Node{
        public:
            int data;
            Node* next;
        public:
            Node(int value);

            void print();
    };

    class LinkedList{
        private:
            Node* head;
            int length;
        
        public:
            LinkedList();
            ~LinkedList();

            int size() const;
            bool empty() const;
            void print() const;
            Node* find(int value) const;
            void append(int value);
            void after(Node *a, int value);
    };