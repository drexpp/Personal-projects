#include <iostream>
#include "Linkedlist.h"

//========================Node=======================
//Instantiation
Node::Node(int value){
    this->data = value;
    this->next = NULL;
}

void Node::print(){
    for(Node* node_ptr = this; node_ptr->next != NULL; 
        node_ptr = node_ptr->next){

        if(node_ptr->next == NULL){
            std::cout << node_ptr->data << std::endl;
        }else{
            std::cout << node_ptr->data << "->" << std::endl;
        }
    }
}

//========================Linkedlist=======================

//Instantiation
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
        this->length++;
    }else{
        Node* last_node = (struct Node*) malloc(sizeof(Node));
        if(last_node != NULL){
            for(Node* node_ptr = this->head; node_ptr != NULL; 
                node_ptr = node_ptr->next){

                last_node = node_ptr;
            }
            last_node->next = new Node(value);
            this->length++;
        }
    }
}

//Printing the linkedlist
void LinkedList::print() const{
    for(Node* node_ptr = this->head; node_ptr != NULL; 
        node_ptr = node_ptr->next){
            if(node_ptr->next == NULL){
                std::cout << node_ptr->data << std::endl;
            }else{
                std::cout << node_ptr->data << "->";
            }
    }
}

//Get node with value specified
Node* LinkedList::find(int value) const{
    Node* found_node = (struct Node*) malloc(sizeof(Node));
    if(found_node != NULL){
        for(Node* node_ptr = this->head; node_ptr != NULL; 
            node_ptr = node_ptr->next){
            
            if(node_ptr->data == value){
                found_node = node_ptr;
                return found_node;
            }
        }
    }
    return NULL;
}

//Insert new node after specified node already existing.
void LinkedList::after(Node *a, int value){
    Node* new_node = (struct Node*) malloc(sizeof(Node));
    if(new_node != NULL){
        new_node->data = value;
        new_node->next = a->next;
        a->next = new_node;
    }
}

int main(void){
    LinkedList* list = new LinkedList();
    std::cout << "==========LIST AND FIRST INSERTS===============" << std::endl;
    std::cout << "Before insert list size ===> " << list->size() << std::endl;
    list->append(3);
    list->append(5);
    list->append(1);
    std::cout << "After insert list size ===> " << list->size() << std::endl;
    std::cout << "=========LIST================" << std::endl;
    list->print();
    std::cout << "=========FIND================" << std::endl;
    if(list->find(3) == NULL){
        std::cout << "Found node: " << list->find(2)->data << std::endl;
    }else{
        std::cout << "That node doesn't exist" << std::endl;
    }
    std::cout << "===========INSERT AFTER==============" << std::endl;
    std::cout << "Before insertion ==> ";
    list->print();
    std::cout << std::endl;

    std::cout << "After insertion ==> ";
    Node *found_node = list->find(5);
    list->after(found_node, 10);
    list->print();
    std::cout << std::endl;
}