#include <iostream>
#include "Linkedlist.h"

//Node implementation
Node::Node(int value){
    this->data = value;
    this->next = NULL;
}

//========================Linkedlist=======================
//Linkedlist instantiation
LinkedList::LinkedList(){
    this->length = 0;
    this->head = NULL;
}

//Linkedlist's size
int LinkedList::size() const{
    return this->length;
}

//is empty linkedlist
bool LinkedList::empty() const{
    return(this->length == 0);
}

//Add new item to the end of the linkedlist
void LinkedList::append(int value){
    if(this->head == NULL){
        Node* new_node = new Node(value);
        this->head = new_node;
    }else{
        Node* last_node = NULL;
        for(Node* node_ptr = this->head; node_ptr != NULL; 
        node_ptr = node_ptr->next){
            last_node = node_ptr;
        }
        last_node->next = new Node(value);
    }
    this->length++;
}

//Printing the linkedlist
void LinkedList::print() const{
    for(Node* node_ptr = this->head; node_ptr != NULL; 
        node_ptr = node_ptr->next){
            if(node_ptr->next == NULL){
                std::cout << node_ptr->data;
            }else{
                std::cout << node_ptr->data << "->";
            }
    }
    std::cout << std::endl;
}

int main(void){
    LinkedList* list = new LinkedList();
    std::cout << "Before insert:  " << std::endl;
    std::cout << "Linked list size: " << list->size() << std::endl;
    list->append(3);
    list->append(5);
    std::cout << "After insert: " << std::endl;
    std::cout << "Linked list size: " << list->size() << std::endl;
    list->print();
}