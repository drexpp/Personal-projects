class Node{
        public:
            int data;
            Node* next;
        public:
            Node(int value);
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
            void append(int value);
    };